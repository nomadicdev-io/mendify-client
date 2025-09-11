import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ImageComponent({src, alt, height= '100%', width= '100%', wrapperClassName, className}) {

  return (
    <div className={`w-full h-full relative ${className}`}>
      <LazyLoadImage
        alt={alt}
        height={height}
        src={src} // use normal <img> attributes as props
        width={width} 
        className='w-full h-full object-cover'
        wrapperClassName={wrapperClassName}
        effect={'blur'}
        wrapperProps={{
          style: {transitionDelay: "1s"},
        }}
        placeholderSrc={'/placeholder.png'}
      />
    </div>
  )
}