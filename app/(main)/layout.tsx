const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full overflow-hidden bg-surface">
      {children}
    </div>
  )
}

export default MainLayout