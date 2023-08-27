import instagram from './InstagramSVG'

export default function SocialIcons() {
  const socials = [
    {
      id: 1,
      img: instagram,
      link: 'https://www.instagram.com/autobiznes.by',
      alt: 'Instagram',
    },
  ]

  return (
    <div className="social-icons">
      {socials.map((item) => (
        <a key={item.id} href={item.link} target="_blank">
          {item.img('#1d2a4a')}
        </a>
      ))}
    </div>
  )
}
