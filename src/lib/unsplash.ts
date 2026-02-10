// Unsplash API for fetching correct vehicle images
// Get your free API key at: https://unsplash.com/developers

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY';
const UNSPLASH_API = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

/**
 * Fetch vehicle images from Unsplash based on make and model
 */
export async function getVehicleImages(
  make: string,
  model: string,
  count: number = 5
): Promise<UnsplashImage[]> {
  try {
    const query = `${make} ${model} car luxury`;
    const response = await fetch(
      `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching vehicle images from Unsplash:', error);
    return [];
  }
}

/**
 * Get a single optimized image URL for a vehicle
 */
export async function getVehicleImageUrl(
  make: string,
  model: string,
  size: 'thumb' | 'small' | 'regular' | 'full' = 'regular'
): Promise<string | null> {
  const images = await getVehicleImages(make, model, 1);
  if (images.length === 0) return null;
  return images[0].urls[size];
}

/**
 * Fallback high-quality car images by brand
 */
export const FALLBACK_IMAGES: Record<string, string> = {
  ferrari: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800',
  lamborghini: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
  porsche: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
  'rolls-royce': 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800',
  bentley: 'https://images.unsplash.com/photo-1554744512-d6c603f27c54?w=800',
  'aston martin': 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800',
  mclaren: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
  bugatti: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800',
  pagani: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800',
  koenigsegg: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
  'mercedes-benz': 'https://images.unsplash.com/photo-1618843479619-f3d0d3fbbf98?w=800',
  bmw: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  audi: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
};

/**
 * Get fallback image for a brand
 */
export function getFallbackImage(make: string): string {
  const normalizedMake = make.toLowerCase().replace(/\s+/g, '-');
  return FALLBACK_IMAGES[normalizedMake] || FALLBACK_IMAGES.ferrari;
}
