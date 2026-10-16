/**
 * Put the Hair Atelier template on the admin Templates page
 * under Beauty & Personal Care.
 * Run: npm run db:seed:beauty-template -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const KEY = 'template-hairatelier-1';
const CATEGORY_SLUG = 'beauty-personal-care';

const template = {
  key: KEY,
  numericId: 16,
  title: 'Hair Atelier',
  type: 'Multiple Pages Website',
  image: '/beauty%20and%20personal%20care/images/hero-1.jpg',
  previewImage: '/beauty%20and%20personal%20care/images/hero-1.jpg',
  previewDescription: 'Beauty and personal care salon website.',
  prebuiltPages: 9,
  pages: [
    { id: 'about', label: 'About Us', sectionType: 'AboutPage' },
    { id: 'services', label: 'Services', sectionType: 'ServicePage' },
    { id: 'service-detail', label: 'Service Detail', sectionType: 'ServiceDetailPage' },
    { id: 'gallery', label: 'Gallery', sectionType: 'GalleryPage' },
    { id: 'blogs', label: 'Blogs', sectionType: 'BlogPage' },
    { id: 'blog-detail', label: 'Blog Detail', sectionType: 'BlogDetailPage' },
    { id: 'contact', label: 'Contact Us', sectionType: 'ContactPage' },
    { id: 'get-a-quote', label: 'Get a Quote', sectionType: 'QuotePage' },
    { id: 'thank-you', label: 'Thank You', sectionType: 'ThankYouPage' },
  ],
  homeSectionOrder: [
    'Header',
    'Banner',
    'About',
    'Stats',
    'Service',
    'Gallery',
    'Testimonial',
    'Blog',
    'Footer',
  ],
  sectionVariants: {
    Header: 'HairAtelierHeader1',
    Footer: 'HairAtelierFooter1',
    Banner: 'HairAtelierHeroBanner1',
    About: 'HairAtelierAboutUs1',
    Service: 'HairAtelierServices1',
    WhyChooseUs: 'HairAtelierWhyChooseUs1',
    Stats: 'HairAtelierStats1',
    Gallery: 'HairAtelierGallery1',
    Testimonial: 'HairAtelierTestimonials1',
    Blog: 'HairAtelierBlogNews1',
    AboutPage: 'HairAtelierAboutPage1',
    ServicePage: 'HairAtelierServicePage1',
    ServiceDetailPage: 'HairAtelierServiceDetailPage1',
    GalleryPage: 'HairAtelierGalleryPage1',
    BlogPage: 'HairAtelierBlogPage1',
    BlogDetailPage: 'HairAtelierBlogDetailPage1',
    ContactPage: 'HairAtelierContactPage1',
    QuotePage: 'HairAtelierQuotePage1',
    ThankYouPage: 'HairAtelierThankYouPage1',
  },
  variables: {
    '--font-body': '"Montserrat", Arial, Helvetica, sans-serif',
    '--font-heading': '"Playfair Display", Georgia, serif',
    '--primary-bg': '#e0a458',
    '--primary-text': '#000000',
    '--secondary-bg': '#000000',
    '--secondary-text': '#ffffff',
    '--header-bg': '#000000',
    '--header-text': '#ffffff',
    '--hero-bg': '#000000',
    '--hero-title': '#ffffff',
    '--primary-pretitle-text': '#e0a458',
    '--primary-title-text': '#ffffff',
    '--primary-subtitle-text': '#ffffff',
    '--secondary-pretitle-text': '#e0a458',
    '--secondary-title-text': '#ffffff',
    '--secondary-subtitle-text': '#ffffff',
    '--primary-link-bg': '#e0a458',
    '--primary-link-color': '#000000',
    '--secondary-link-bg': '#111111',
    '--secondary-link-color': '#ffffff',
    '--text-white': 'white',
    '--blue-bg': '#e0a458',
    '--lightcream-bg': '#1a1208',
  },
  order: 16,
  status: 'Active',
};

async function main() {
  const category = await prisma.category.findUnique({
    where: { slug: CATEGORY_SLUG },
  });
  if (!category) {
    throw new Error(`Category not found: ${CATEGORY_SLUG}`);
  }

  const clash = await prisma.template.findFirst({
    where: { numericId: template.numericId, NOT: { key: KEY } },
  });
  if (clash) {
    await prisma.template.update({
      where: { id: clash.id },
      data: { numericId: template.numericId + 100000 },
    });
    console.log(`✓ Moved numericId clash from ${clash.key}`);
  }

  const row = await prisma.template.upsert({
    where: { key: KEY },
    create: template,
    update: template,
  });
  console.log(`✓ Template ${row.key} — ${row.title}`);

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
