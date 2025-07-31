// Test component to verify theme variables are working correctly
export default function ThemeTest() {
  return (
    <div className="p-4 space-y-4">
      <div className="bg-background text-foreground p-4 border border-border rounded-lg">
        <h3 className="font-bold">Background & Foreground</h3>
        <p className="text-muted-foreground">Muted foreground text</p>
      </div>
      
      <div className="bg-card text-card-foreground p-4 rounded-lg shadow-sm border border-border">
        <h3 className="font-bold">Card Background</h3>
        <p>Card foreground text</p>
      </div>
      
      <div className="bg-primary text-primary-foreground p-4 rounded-lg">
        <h3 className="font-bold">Primary Colors</h3>
      </div>
      
      <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
        <h3 className="font-bold">Secondary Colors</h3>
      </div>
      
      <div className="bg-accent text-accent-foreground p-4 rounded-lg">
        <h3 className="font-bold">Accent Colors</h3>
      </div>
      
      <div className="bg-muted text-muted-foreground p-4 rounded-lg">
        <h3 className="font-bold">Muted Background</h3>
      </div>
    </div>
  )
}