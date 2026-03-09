/**
 * Collects comprehensive user data for analytics
 */

export interface UserData {
  // Basic info
  email: string;
  subscribedAt: string;
  source: string;

  // Location data
  location?: {
    country?: string;
    countryCode?: string;
    region?: string;
    regionName?: string;
    city?: string;
    zip?: string;
    lat?: number;
    lon?: number;
    timezone?: string;
    isp?: string;
  };

  // Device & Browser
  device: {
    userAgent: string;
    platform: string;
    language: string;
    languages: string[];
    screenWidth: number;
    screenHeight: number;
    screenColorDepth: number;
    pixelRatio: number;
    deviceType: "mobile" | "tablet" | "desktop";
    isMobile: boolean;
    cookieEnabled: boolean;
    online: boolean;
  };

  // Referral data
  referral?: {
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
  };

  // Session data
  session: {
    sessionId: string;
    pageLoadTime: string;
    timeOnPage?: number;
  };
}

/**
 * Get device type from user agent
 */
function getDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(ua);
  
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}

/**
 * Get UTM parameters from URL
 */
function getUTMParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
} {
  if (typeof window === "undefined") return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    utmContent: params.get("utm_content") || undefined,
  };
}

/**
 * Get location data from IP (using free API with HTTPS support)
 * Tries multiple APIs with fallback for reliability
 */
async function getLocationData(): Promise<UserData["location"]> {
  // Primary API: ipapi.co (free, HTTPS supported, 1000 req/day)
  try {
    const response = await fetch("https://ipapi.co/json/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // ipapi.co returns error field if there's an issue
      if (!data.error) {
        // Map ipapi.co response format to our location data structure
        const locationData = {
          country: data.country_name || undefined,
          countryCode: data.country_code || undefined,
          region: data.region_code || undefined,
          regionName: data.region || undefined,
          city: data.city || undefined,
          zip: data.postal || undefined,
          lat: data.latitude || undefined,
          lon: data.longitude || undefined,
          timezone: data.timezone || undefined,
          isp: data.org || undefined,
        };
        
        // Only return if we have at least some data
        if (locationData.country || locationData.city) {
          console.log("Location data fetched successfully from ipapi.co:", locationData);
          return locationData;
        }
      }
    }
  } catch (error) {
    console.warn("Primary location API (ipapi.co) failed, trying fallback:", error);
  }
  
  // Fallback API: ipinfo.io (free, HTTPS supported, 50k req/month)
  try {
    const response = await fetch("https://ipinfo.io/json", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // ipinfo.io uses different field names (country is 2-letter code only)
      const locationData = {
        country: undefined, // ipinfo.io doesn't provide full country name, only code
        countryCode: data.country || undefined,
        region: data.region || undefined,
        regionName: data.region || undefined,
        city: data.city || undefined,
        zip: data.postal || undefined,
        lat: data.loc ? parseFloat(data.loc.split(',')[0]) : undefined,
        lon: data.loc ? parseFloat(data.loc.split(',')[1]) : undefined,
        timezone: data.timezone || undefined,
        isp: data.org || undefined,
      };
      
      // Only return if we have at least some data
      if (locationData.countryCode || locationData.city) {
        console.log("Location data fetched successfully from ipinfo.io (fallback):", locationData);
        return locationData;
      }
    }
  } catch (error) {
    console.warn("Fallback location API (ipinfo.io) also failed:", error);
  }
  
  // If both APIs fail, return undefined (form submission will continue)
  console.warn("All location APIs failed. Form submission will continue without location data.");
  return undefined;
}

/**
 * Generate session ID
 */
function generateSessionId(): string {
  if (typeof window === "undefined") return "";
  
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

/**
 * Collect all user data
 */
export async function collectUserData(email: string, source: string = "landing_page"): Promise<UserData> {
  if (typeof window === "undefined") {
    throw new Error("This function must be called in the browser");
  }

  const pageLoadTime = new Date().toISOString();
  const sessionId = generateSessionId();

  // Collect device data
  const device: UserData["device"] = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: Array.from(navigator.languages || []),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    screenColorDepth: window.screen.colorDepth,
    pixelRatio: window.devicePixelRatio || 1,
    deviceType: getDeviceType(),
    isMobile: /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
    cookieEnabled: navigator.cookieEnabled,
    online: navigator.onLine,
  };

  // Collect referral data
  const utmParams = getUTMParams();
  const referral: UserData["referral"] = {
    referrer: document.referrer || undefined,
    ...utmParams,
  };

  // Get location data (async)
  const location = await getLocationData();
  
  // Log location data for debugging
  if (location) {
    console.log("Location data collected:", location);
  } else {
    console.warn("Location data not available (API may have failed or been blocked)");
  }

  const userData: UserData = {
    email,
    subscribedAt: new Date().toISOString(),
    source,
    location: location || undefined, // Explicitly set to undefined if null
    device,
    referral,
    session: {
      sessionId,
      pageLoadTime,
    },
  };
  
  // Log final user data structure (without sensitive info)
  console.log("User data structure:", {
    email: userData.email,
    source: userData.source,
    hasLocation: !!userData.location,
    locationKeys: userData.location ? Object.keys(userData.location) : [],
    hasDevice: !!userData.device,
    hasReferral: !!userData.referral,
    hasSession: !!userData.session,
  });

  return userData;
}

