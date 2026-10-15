/**
 * Put the CoolFix template on the admin Templates page.
 * Run: npm run db:seed:coolfix-template -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const KEY = 'template-coolfix-1';
const CATEGORY_SLUG = 'professional-services';

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
    'HowWeWork',
    'About',
    'Service',
    'Stats',
    'Testimonial',
    'CTA',
    'Highlights',
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
    Breadcrumb: 'Breadcrumb-1',
  },
  variables: {
    '--font-body': '"Geist", Arial, Helvetica, sans-serif',
    '--font-heading': '"Geist", Arial, Helvetica, sans-serif',
    fontFamily: '"Geist", Arial, Helvetica, sans-serif',
    '--primary-bg': '#ff6b00',
    '--primary-text': '#ffffff',
    '--header-bg': '#0b2a5b',
    '--header-text': '#ffffff',
    '--secondary-bg': '#ffffff',
    '--secondary-text': '#0b2a5b',
    '--hero-bg': '#0b2a5b',
    '--hero-title': '#ffffff',
    '--blue-bg': '#ff6b00',
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

  const category = await prisma.category.findUnique({
    where: { slug: CATEGORY_SLUG },
  });
  if (!category) {
    throw new Error(`Category not found: ${CATEGORY_SLUG}`);
  }

  const contents = await prisma.categoryContent.findMany();
  for (const content of contents) {
    const keys = Array.isArray(content.templateKeys) ? content.templateKeys : [];
    if (content.categorySlug === CATEGORY_SLUG || !keys.includes(KEY)) continue;
    await prisma.categoryContent.update({
      where: { id: content.id },
      data: { templateKeys: keys.filter((key) => key !== KEY) },
    });
    console.log(`✓ Removed from ${content.categoryName}`);
  }

  const existing = contents.find((content) => content.categorySlug === CATEGORY_SLUG);
  const keys = Array.isArray(existing?.templateKeys)
    ? existing.templateKeys.filter((key) => key !== KEY)
    : [];

  await prisma.categoryContent.upsert({
    where: { categorySlug: CATEGORY_SLUG },
    create: {
      categorySlug: CATEGORY_SLUG,
      categoryName: category.name,
      templateKeys: [KEY],
      sections: {},
      status: 'Active',
    },
    update: {
      categoryName: category.name,
      templateKeys: [...keys, KEY],
      status: 'Active',
    },
  });
  console.log(`✓ Linked to ${category.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
