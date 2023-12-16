export interface ImageDetails {
  id: string;
  description: string | null; // Description of the image, can be null
  created_at: string;
  urls: {
    small: string;   
    regular: string;  
    
  };
  user: {
    name: string;            // Name of the user who uploaded the image
    profile_image_url: string; // URL of the user's profile image
  };
  
}