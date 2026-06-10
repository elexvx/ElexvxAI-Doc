'use client';

import { useEffect, useId, useRef, useState } from 'react';

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const reactId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panZoomRef = useRef<{
    destroy: () => void;
    fit: () => void;
    center: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
  } | null>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const renderChart = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'neutral',
        });
        const chartId = `mermaid-${reactId.replace(/[:]/g, '-')}`;
        const { svg: renderedSvg } = await mermaid.render(chartId, chart);
        if (!cancelled) {
          panZoomRef.current?.destroy();
          panZoomRef.current = null;
          setSvg(renderedSvg);
          setError('');
        }
      } catch (renderError) {
        if (!cancelled) {
          const message = renderError instanceof Error ? renderError.message : 'Unknown Mermaid render error';
          setError(message);
          setSvg('');
        }
      }
    };

    void renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  useEffect(() => {
    if (!svg || !containerRef.current) {
      return;
    }

    let disposed = false;

    const setupPanZoom = async () => {
      const svgElement = containerRef.current?.querySelector('svg');
      if (!svgElement) {
        return;
      }

      const width = svgElement.viewBox.baseVal.width || svgElement.getBoundingClientRect().width;
      const height = svgElement.viewBox.baseVal.height || svgElement.getBoundingClientRect().height;
      if (!svgElement.getAttribute('viewBox') && width > 0 && height > 0) {
        svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
      }

      svgElement.style.width = '100%';
      svgElement.style.height = 'auto';
      svgElement.style.maxWidth = 'none';

      const svgPanZoomModule = await import('svg-pan-zoom');
      const svgPanZoom = svgPanZoomModule.default;
      if (disposed) {
        return;
      }

      panZoomRef.current?.destroy();
      const instance = svgPanZoom(svgElement, {
        zoomEnabled: true,
        controlIconsEnabled: false,
        fit: true,
        center: true,
        minZoom: 0.5,
        maxZoom: 8,
        mouseWheelZoomEnabled: true,
        dblClickZoomEnabled: true,
        preventMouseEventsDefault: true,
        panEnabled: true,
      });
      panZoomRef.current = instance;

      requestAnimationFrame(() => {
        try {
          if (!containerRef.current || containerRef.current.clientWidth === 0) {
            return;
          }
          instance.resize();
          instance.fit();
          instance.center();
        } catch (fitError) {
          console.warn('Mermaid pan-zoom initialization skipped:', fitError);
        }
      });
    };

    void setupPanZoom();

    return () => {
      disposed = true;
      panZoomRef.current?.destroy();
      panZoomRef.current = null;
    };
  }, [svg]);

  const handleZoomIn = () => panZoomRef.current?.zoomIn();
  const handleZoomOut = () => panZoomRef.current?.zoomOut();
  const handleReset = () => {
    panZoomRef.current?.resetZoom();
    panZoomRef.current?.fit();
    panZoomRef.current?.center();
  };
  const handleFitWidth = () => {
    try {
      panZoomRef.current?.fit();
      panZoomRef.current?.center();
    } catch (fitError) {
      console.warn('Mermaid fit width failed:', fitError);
    }
  };
  const handleExpandedView = () => {
    setExpanded((current) => !current);
    requestAnimationFrame(() => {
      try {
        panZoomRef.current?.fit();
        panZoomRef.current?.center();
      } catch (fitError) {
        console.warn('Mermaid expanded view fit failed:', fitError);
      }
    });
  };

  if (error) {
    return (
      <div className="my-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Mermaid render failed: {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={[
        'my-4 rounded-xl border border-zinc-200 bg-white transition-all',
        expanded ? 'fixed inset-6 z-50 my-0 shadow-2xl' : '',
      ].join(' ')}
    >
      <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-2">
        <div className="text-xs text-zinc-500">滚轮缩放，拖拽平移</div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleFitWidth}
            className="rounded-md border border-zinc-200 px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            适应宽度
          </button>
          <button
            type="button"
            onClick={handleExpandedView}
            className="rounded-md border border-zinc-200 px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            {expanded ? '退出查看' : '放大查看'}
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="rounded-md border border-zinc-200 px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            -
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-zinc-200 px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            重置
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            className="rounded-md border border-zinc-200 px-2 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            +
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className={['overflow-hidden bg-white p-4', expanded ? 'h-[calc(100%-53px)]' : ''].join(' ')}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
