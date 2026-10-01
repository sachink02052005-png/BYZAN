import { SITE } from '@/data/site'

/**
 * Contact page (route: "/contact").
 * Structural placeholder only. Will hold the contact details and
 * appointment/enquiry form.
 */
export default function Contact() {
  return (
    <>
      <title>{`Contact | ${SITE.name}`}</title>
      <h1 className="sr-only">Contact</h1>
    </>
  )
}
