type CMSIconProps = {
  icon: string
}

export const CMSIcon = ({ icon }: CMSIconProps) => {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center"
      dangerouslySetInnerHTML={{
        __html: icon
      }}
    />
  )
}
