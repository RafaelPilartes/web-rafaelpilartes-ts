type AvatarProps = {
  photoImage: string
}

const Avatar = ({ photoImage }: AvatarProps) => {
  return (
    <div className="h-full hidden xl:flex xl:max-w-none">
      <img
        src={photoImage}
        width={540}
        height={540}
        alt="Rafael Pilartes"
        className="w-full h-full object-cover translate-z-0 "
      />
    </div>
  )
}

export default Avatar
