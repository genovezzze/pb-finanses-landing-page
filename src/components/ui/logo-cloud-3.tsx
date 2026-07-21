import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { cn } from '@/lib/utils'

type Logo = {
  src: string
  alt: string
  width?: number
  height?: number
}

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[]
}

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black,transparent)]',
        className
      )}
    >
      <InfiniteSlider gap={48} reverse speed={80} speedOnHover={25}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-5 w-auto select-none md:h-6 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300"
            height={logo.height || 24}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width}
          />
        ))}
      </InfiniteSlider>
    </div>
  )
}
