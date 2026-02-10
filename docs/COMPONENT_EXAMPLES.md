# Component Examples

> Practical examples using the NordLion design system

## Buttons

### Primary Button
```tsx
// Luxury gold button for primary actions
<button className="btn-primary">
  <span>Explore Collection</span>
  <ArrowRight className="ml-2 w-5 h-5" />
</button>
```

### Secondary Button
```tsx
// Glass effect button for secondary actions
<button className="btn-secondary">
  Learn More
</button>
```

### Button with Loading State
```tsx
const [isLoading, setIsLoading] = useState(false)

<button 
  className="btn-primary relative" 
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <div className="loading-spinner mr-2" />
      <span>Processing...</span>
    </>
  ) : (
    <span>Request Information</span>
  )}
</button>
```

---

## Cards

### Luxury Vehicle Card
```tsx
interface VehicleCardProps {
  vehicle: {
    name: string
    brand: string
    price: number
    image: string
    year: number
  }
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="glass-effect luxury-hover rounded-xl overflow-hidden group">
      {/* Image */}
      <div className="relative h-64 image-overlay">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
          {vehicle.year}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-gold text-sm font-medium mb-2">{vehicle.brand}</p>
        <h3 className="text-2xl font-serif font-bold mb-4">{vehicle.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold gradient-text">
            ${vehicle.price.toLocaleString()}
          </span>
          <button className="btn-secondary py-2 px-4">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Feature Card
```tsx
export function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="glass-effect p-8 rounded-xl gold-glow animate-fade-in-up">
      <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-gold" />
      </div>
      <h3 className="text-2xl font-serif font-bold mb-4">{title}</h3>
      <p className="text-muted leading-relaxed">{description}</p>
    </div>
  )
}
```

---

## Navigation

### Luxury Navigation Bar
```tsx
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-effect py-4" : "bg-transparent py-6"
    )}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gold rounded-lg" />
          <span className="text-2xl font-serif font-bold gradient-text">
            NordLion
          </span>
        </div>
        
        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/vehicles" className="luxury-hover text-white">
            Vehicles
          </a>
          <a href="/about" className="luxury-hover text-white">
            About
          </a>
          <a href="/contact" className="luxury-hover text-white">
            Contact
          </a>
        </div>
        
        {/* CTA */}
        <button className="btn-primary">
          Inquire Now
        </button>
      </div>
    </nav>
  )
}
```

---

## Hero Sections

### Full-Screen Hero
```tsx
export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-background.jpg"
          alt="Luxury vehicles"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 luxury-gradient-overlay" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <h1 className="font-serif font-bold mb-6 animate-fade-in-up">
          Curated
          <span className="gradient-text"> Luxury </span>
          Excellence
        </h1>
        <p className="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto animate-fade-in-up" 
           style={{ animationDelay: '200ms' }}>
          Discover the world's most exceptional hypercars, luxury vehicles, and private jets
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
             style={{ animationDelay: '400ms' }}>
          <button className="btn-primary">
            Explore Collection
          </button>
          <button className="btn-secondary">
            Schedule Consultation
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <ChevronDown className="w-8 h-8 text-gold" />
      </div>
    </section>
  )
}
```

---

## Forms

### Inquiry Form
```tsx
export function InquiryForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = async (data) => {
    // Handle form submission
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="w-full glass-effect px-4 py-3 rounded-xl border border-white/10 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">Name is required</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          className="w-full glass-effect px-4 py-3 rounded-xl border border-white/10 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          {...register('message', { required: true })}
          rows={4}
          className="w-full glass-effect px-4 py-3 rounded-xl border border-white/10 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
          placeholder="Tell us about your interest..."
        />
      </div>
      
      <button type="submit" className="btn-primary w-full">
        Submit Inquiry
      </button>
    </form>
  )
}
```

---

## Animations

### Staggered List Animation
```tsx
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function VehicleList({ vehicles }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {vehicles.map((vehicle) => (
        <motion.div key={vehicle.id} variants={item}>
          <VehicleCard vehicle={vehicle} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

## Modals

### Quick View Modal
```tsx
import * as Dialog from '@radix-ui/react-dialog'

export function QuickViewModal({ vehicle, open, onClose }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-effect border border-gold/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto animate-scale-in">
          {/* Close button */}
          <Dialog.Close className="absolute top-4 right-4 text-white hover:text-gold transition-colors">
            <X className="w-6 h-6" />
          </Dialog.Close>
          
          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">
                {vehicle.name}
              </h2>
              <p className="text-gold text-lg mb-6">{vehicle.brand}</p>
              <p className="text-muted mb-8">{vehicle.description}</p>
              <div className="flex items-center gap-4">
                <button className="btn-primary flex-1">
                  Request Information
                </button>
                <button className="btn-secondary px-4">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

---

## Loading States

### Skeleton Loader
```tsx
export function VehicleCardSkeleton() {
  return (
    <div className="glass-effect rounded-xl overflow-hidden">
      <div className="h-64 bg-white/5 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-white/5 rounded animate-pulse w-1/3" />
        <div className="h-8 bg-white/5 rounded animate-pulse w-2/3" />
        <div className="h-6 bg-white/5 rounded animate-pulse w-1/2" />
      </div>
    </div>
  )
}

// Usage
export function VehicleGrid() {
  const { data: vehicles, isLoading } = useVehicles()
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <VehicleCardSkeleton key={i} />
        ))}
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}
```

---

## Toast Notifications

### Success Toast
```tsx
import * as Toast from '@radix-ui/react-toast'

export function SuccessToast({ message, open, onClose }) {
  return (
    <Toast.Root
      open={open}
      onOpenChange={onClose}
      className="glass-effect border border-green-500/20 rounded-xl p-4 flex items-center gap-4 animate-slide-in-right"
    >
      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
        <Check className="w-6 h-6 text-green-500" />
      </div>
      <div className="flex-1">
        <Toast.Title className="font-semibold">
          Success!
        </Toast.Title>
        <Toast.Description className="text-sm text-muted">
          {message}
        </Toast.Description>
      </div>
      <Toast.Close>
        <X className="w-5 h-5 text-muted hover:text-white transition-colors" />
      </Toast.Close>
    </Toast.Root>
  )
}
```

---

**More examples coming soon!**

For questions or contributions, see [CONTRIBUTING.md](../CONTRIBUTING.md)
