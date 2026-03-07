import Image from "next/image";

export default function ImageComponent() {
  return (
    <div>
      <h1 className="text-success">Next.js Image Component tutorial</h1>

      <div>
        <Image
          src={
            "https://lh6.googleusercontent.com/proxy/G_p2LpvJ4Hfe2uBBUMBIl7H5caAYIhTTn7WK4xW0cHlwCONhWtYKBCJNMNjOVRBtwtCqxwv383KSroInLrnmLPDZugW5ZYSKQ9b0dEgGTg4dO8E-vHTP3ToFZBxTuObLC59Z9yIm7HE-ktbLeQ"
          }
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}

// notes:
// 1. optimaize image in next.config file if img src are from extermal resource or url
// 2. set height and widht for remote images

// Next.js <Image> Component Notes
// - Import from 'next/image' →  import Image from 'next/image'
// - Used for optimized images (automatic resizing, lazy loading, and WebP support).
// - Must include `src`, `alt`, `width`, and `height` (or use `fill` for responsive images).
// - Example:
//     import Image from 'next/image'
//     <Image
//       src="/images/profile.jpg"   // from public/images folder
//       alt="User profile photo"
//       width={200}
//       height={200}
//       priority                     // optional: preload for LCP
//     />
// - Local images (from /public) use relative paths:  src="/image.png"
// - Remote images (from URLs) require domain whitelisting in next.config.js
//     Example:
//       images: {
//         domains: ['example.com'],
//       }
// - Use `fill` + parent container with `position: relative` for responsive layouts.
// - Automatically optimizes and serves images through Next.js Image Optimization API.
// -  Benefits: better performance, smaller file sizes, and improved SEO.
