// Utility function for downloading course brochures
export const downloadBrochure = async (courseSlug?: string) => {
  try {
    // Use API-based download first
    const response = await fetch(`/api/download-brochure?course=${courseSlug || 'general'}`);
    
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response headers if available
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `${courseSlug || 'French-Course'}-Brochure.pdf`;
      
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="([^"]+)"/);
        if (matches && matches[1]) {
          filename = matches[1];
        }
      }
      
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('Brochure download initiated for:', courseSlug);
      return true;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error downloading brochure:', error);
    // Fallback: Try opening in new tab
    try {
      window.open('/french-course-brochure.pdf', '_blank');
      return true;
    } catch (fallbackError) {
      console.error('Fallback download method failed:', fallbackError);
      return false;
    }
  }
};

// Legacy function for backward compatibility
export const downloadBrochureViaAPI = downloadBrochure;
