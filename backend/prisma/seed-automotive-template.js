/**
 * Put the Rydora template on the admin Templates page under Automotive.
 * Run: npm run db:seed:automotive-template -w backend
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const KEY = 'template-rydora-1';
const CATEGORY_SLUG = 'automotive';

const template = {
  key: KEY,
  numericId: 18,
  title: 'Rydora',
  type: 'Multiple Pages Website',
  image: '/automotive/images/hero-car.jpg',
  previewImage: '/automotive/images/hero-car.jpg',
  previewDescription: 'Luxury car rental website.',
  prebuiltPages: 7,
  pages: [
    { id: 'about', label: 'About Us', sectionType: 'About', sectionOrder: ['PageBanner', 'About', 'WorkingProcess', 'WhyChooseUs'] },
    { id: 'portfolio', label: 'Portfolio', sectionType: 'PortfolioPage', sectionOrder: ['PageBanner', 'PortfolioPage'] },
    { id: 'services', label: 'Services', sectionType: 'Service', sectionOrder: ['PageBanner', 'Service', 'Brands'] },
    { id: 'gallery', label: 'Gallery', sectionType: 'Gallery', sectionOrder: ['PageBanner', 'Gallery'] },
    { id: 'blog', label: 'Blogs', sectionType: 'Blog', sectionOrder: ['PageBanner', 'Blog'] },
    { id: 'contact', label: 'Contact Us', sectionType: 'ContactPage', sectionOrder: ['PageBanner', 'ContactPage'] },
    { id: 'enquiry', label: 'Enquiry', sectionType: 'EnquiryPage', sectionOrder: ['PageBanner', 'EnquiryPage'] },
  ],
  homeSectionOrder: [
    'Header',
    'Banner',
    'Fleet',
    'About',
    'Service',
    'WorkingProcess',
    'Testimonial',
    'Brands',
    'Blog',
    'Footer',
  ],
  sectionVariants: {
    Header: 'RydoraHeader1',
    Footer: 'RydoraFooter1',
    Banner: 'RydoraHero1',
    Fleet: 'RydoraFleet1',
    PortfolioPage: 'RydoraFleet1',
    About: 'RydoraAboutUs1',
    Service: 'RydoraServices1',
    WorkingProcess: 'RydoraWorkingProcess1',
    Testimonial: 'RydoraTestimonials1',
    Brands: 'RydoraBrands1',
    Blog: 'RydoraBlogNews1',
    PageBanner: 'RydoraPageBanner1',
    WhyChooseUs: 'RydoraWhyChooseUs1',
    Gallery: 'RydoraGallery1',
    ContactPage: 'RydoraContactPage1',
    EnquiryPage: 'RydoraEnquiryForm1',
  },
  variables: {
    '--font-body': '"Manrope", Arial, Helvetica, sans-serif',
    '--font-heading': '"Manrope", Arial, Helvetica, sans-serif',
    '--primary-bg': '#c0703a',
    '--primary-text': '#ffffff',
    '--secondary-bg': '#140b06',
    '--secondary-text': '#ffffff',
    '--header-bg': '#140b06',
    '--header-text': '#ffffff',
    '--hero-bg': '#140b06',
    '--hero-title': '#ffffff',
    '--blue-bg': '#8f4a1f',
    '--lightcream-bg': '#faf3ee',
  },
  order: 18,
  status: 'Active',
};

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: CATEGORY_SLUG },
    create: {
      order: 7,
      name: 'Automotive',
      slug: CATEGORY_SLUG,
      icon: 'lucide-car',
      description: 'Luxury car rental websites',
      status: 'Active',
    },
    update: {
      name: 'Automotive',
      status: 'Active',
    },
  });

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
  .finally(() => {
    process.exit(0);
  });
