/**
 * Put the CoolFix template on the admin Templates page.
 * Run: npm run db:seed:coolfix-template -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const KEY = 'template-coolfix-1';

const template = {
  key: KEY,
  numericId: 9201,
  title: 'CoolFix',
  type: 'Multiple Pages Website',
  image: '/services/images/image_01.jpg',
  previewImage: '/services/images/image_01.jpg',
  previewDescription: 'AC Repair & Services website',
  prebuiltPages: 7,
  pages: [
    { id: 'about-us', label: 'About', sectionType: 'AboutPage' },
    { id: 'services', label: 'Services', sectionType: 'ServicePage' },
    { id: 'service-detail', label: 'Service Detail', sectionType: 'ServiceDetailPage' },
    { id: 'gallery', label: 'Gallery', sectionType: 'GalleryPage' },
    { id: 'contact-us', label: 'Contact', sectionType: 'ContactPage' },
    { id: 'get-a-quote', label: 'Get a Quote', sectionType: 'GetQuotePage' },
    { id: 'book-service', label: 'Book Service', sectionType: 'BookServicePage' },
  ],
  homeSectionOrder: [
    'Topbar',
    'Header',
    'Banner',
    'Stats',
    'About',
    'Service',
    'Highlights',
    'HowWeWork',
    'CTA',
    'Testimonial',
    'Footer',
  ],
  sectionVariants: {
    Topbar: 'CoolFixTopbar1',
    Header: 'CoolFixHeader1',
    Banner: 'CoolFixBanner1',
    Stats: 'CoolFixStats1',
    About: 'CoolFixAbout1',
    AboutPage: 'CoolFixAboutPage1',
    Service: 'CoolFixService1',
    ServicePage: 'CoolFixServicePage1',
    ServiceDetailPage: 'CoolFixServiceDetailPage1',
    WhyChooseUs: 'CoolFixWhyChooseUs1',
    Highlights: 'CoolFixHighlights1',
    HowWeWork: 'CoolFixHowWeWork1',
    CTA: 'CoolFixCTA1',
    Testimonial: 'CoolFixTestimonial1',
    Gallery: 'CoolFixGallery1',
    GalleryPage: 'CoolFixGalleryPage1',
    ContactPage: 'CoolFixContactPage1',
    GetQuotePage: 'CoolFixGetQuote1',
    BookServicePage: 'CoolFixBookService1',
    Footer: 'CoolFixFooter1',
  },
  variables: {
    '--font-body': '"Geist", Arial, Helvetica, sans-serif',
    '--font-heading': '"Geist", Arial, Helvetica, sans-serif',
    fontFamily: '"Geist", Arial, Helvetica, sans-serif',
  },
  order: 9201,
  status: 'Active',
};

async function main() {
  const clash = await prisma.template.findFirst({
    where: { numericId: template.numericId, NOT: { key: KEY } },
  });
  if (clash) {
    await prisma.template.update({
      where: { id: clash.id },
      data: { numericId: template.numericId + 100000 },
    });
  }

  const row = await prisma.template.upsert({
    where: { key: KEY },
    create: template,
    update: template,
  });
  console.log(`✓ Template ${row.key} — ${row.title}`);

  const categories = await prisma.categoryContent.findMany();
  const target = categories.find((category) => {
    const slug = String(category.categorySlug || '').toLowerCase();
    const name = String(category.categoryName || '').toLowerCase();
    return slug === 'services' || name === 'services' || name.includes('professional');
  });

  if (!target) {
    console.log('No Services category row. Template is still listed under All.');
    return;
  }

  const keys = Array.isArray(target.templateKeys) ? target.templateKeys : [];
  if (!keys.includes(KEY)) {
    await prisma.categoryContent.update({
      where: { id: target.id },
      data: { templateKeys: [...keys, KEY] },
    });
    console.log(`✓ Linked to category ${target.categoryName}`);
  } else {
    console.log(`✓ Already linked to ${target.categoryName}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
