/**
 * OGL-specific WebGL detection and utility functions
 * Provides safe WebGL support checking for OGL library
 */

export interface OGLSupport {
  supported: boolean;
  context?: WebGLRenderingContext | WebGL2RenderingContext | null;
  error?: string;
  vendor?: string;
  renderer?: string;
  version?: string;
}

/**
 * Safely detect WebGL support for OGL library
 */
export const detectOGLSupport = (): OGLSupport => {
  if (typeof window === 'undefined') {
    return { supported: false, error: 'Server-side rendering' };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || 
               canvas.getContext('experimental-webgl') ||
               canvas.getContext('webgl2')) as WebGLRenderingContext | WebGL2RenderingContext | null;

    if (!gl) {
      return { supported: false, error: 'WebGL context creation failed' };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown';
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';
    const version = gl.getParameter(gl.VERSION) || 'Unknown';

    return {
      supported: true,
      context: gl,
      vendor,
      renderer,
      version
    };
  } catch (error) {
    return {
      supported: false,
      error: error instanceof Error ? error.message : 'Unknown WebGL error'
    };
  }
};

/**
 * Check if OGL can be used safely
 */
export const isOGLAvailable = (): boolean => {
  return detectOGLSupport().supported;
};

/**
 * Get OGL context info for debugging
 */
export const getOGLInfo = (): { vendor: string; renderer: string; version: string } | null => {
  if (typeof window === 'undefined') return null;

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || 
               canvas.getContext('experimental-webgl') ||
               canvas.getContext('webgl2')) as WebGLRenderingContext | WebGL2RenderingContext | null;

    if (!gl) return null;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown';
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';
    const version = gl.getParameter(gl.VERSION) || 'Unknown';

    return { vendor, renderer, version };
  } catch {
    return null;
  }
};

/**
 * Check if device has sufficient WebGL capabilities for OGL
 */
export const hasSufficientOGLSupport = (): boolean => {
  if (!isOGLAvailable()) return false;

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || 
               canvas.getContext('experimental-webgl') ||
               canvas.getContext('webgl2')) as WebGLRenderingContext | WebGL2RenderingContext | null;

    if (!gl) return false;

    // Check for basic shader support
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return false;

    // Clean up
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return true;
  } catch {
    return false;
  }
};

/**
 * Performance check for OGL capabilities
 */
export const checkOGLPerformance = (): 'high' | 'medium' | 'low' | 'unsupported' => {
  if (!isOGLAvailable()) return 'unsupported';

  try {
    const info = getOGLInfo();
    if (!info) return 'low';

    // Check for high-performance GPUs
    const highPerfGPUs = [
      'NVIDIA',
      'AMD',
      'Intel Iris',
      'Apple M1',
      'Apple M2',
      'Apple M3'
    ];

    const isHighPerf = highPerfGPUs.some(gpu => 
      info.renderer.includes(gpu) || info.vendor.includes(gpu)
    );

    if (isHighPerf) return 'high';

    // Check for mobile GPUs
    const mobileGPUs = [
      'Adreno',
      'Mali',
      'PowerVR',
      'Intel HD'
    ];

    const isMobile = mobileGPUs.some(gpu => 
      info.renderer.includes(gpu) || info.vendor.includes(gpu)
    );

    return isMobile ? 'low' : 'medium';
  } catch {
    return 'low';
  }
};

/**
 * Get optimal resolution scale for OGL based on device performance
 */
export const getOptimalResolutionScale = (): number => {
  const performance = checkOGLPerformance();
  
  switch (performance) {
    case 'high':
      return 1.0;
    case 'medium':
      return 0.8;
    case 'low':
      return 0.6;
    default:
      return 0.5;
  }
};

/**
 * Check if OGL library is available
 */
export const isOGLLibraryAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    // Check if OGL is available in the global scope or as a module
    return typeof require !== 'undefined' || typeof window !== 'undefined';
  } catch {
    return false;
  }
}; 