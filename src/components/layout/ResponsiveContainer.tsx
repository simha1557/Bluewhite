// Removed unused cn import

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
}

export const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = '7xl'
}: ResponsiveContainerProps) => {
  const containerClasses = [
    'container-responsive mx-auto',
    `max-w-${maxWidth}`,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div className={containerClasses}>
      {children}
    </div>
  )
}

export default ResponsiveContainer 