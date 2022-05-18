import DOMPurify from 'dompurify'

export default function Text({ content, className, tag }) {

  const CustomTag = `${tag || 'span'}`

  return (
    <>
      {
        content ?
          <CustomTag className={`${className}`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
          :
          null
      }
    </>
  )
}
