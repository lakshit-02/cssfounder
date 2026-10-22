export type BlogPost = {
  slug: string;
  day: string;
  monthYear: string;
  date: string;
  category: string;
  title: string;
  description: string;
  image: string;
  intro: string;
  steps: { title: string; text: string }[];
  note: string;
};

export const blogs: BlogPost[] = [
  {
    slug: "essential-tips-for-a-smooth-road-trip",
    day: "15",
    monthYear: "Aug 2026",
    date: "August 15, 2026",
    category: "Travel Tips",
    title: "10 Essential Tips for a Smooth Road Trip",
    description:
      "Planning a road trip? Here are 10 essential tips to ensure a safe, comfortable and memorable journey.",
    image: "/automotive/images/blog/road-trip.jpg",
    intro:
      "Renting a car is one of the most convenient ways to travel, whether for business, a family vacation, or a weekend getaway. It gives you the freedom to explore at your own pace and reach destinations comfortably. However, to make the most of your rental experience, a little planning goes a long way.",
    steps: [
      {
        title: "Choose the Right Vehicle for Your Needs",
        text: "Select a car that suits your travel purpose. For city trips, a compact car is ideal, while SUVs or premium cars are better for family travel or long road trips. Choosing the right vehicle ensures a more comfortable and enjoyable journey.",
      },
      {
        title: "Book in Advance",
        text: "Advance booking helps you get the best rates and a wider range of vehicle options. It also ensures availability during peak travel seasons, so you don't have to compromise on your preferred car.",
      },
      {
        title: "Check Rental Terms and Policies",
        text: "Before confirming your booking, take time to read the rental terms carefully. Understand the mileage limits, fuel policy, insurance coverage, and any additional charges to avoid surprises later.",
      },
      {
        title: "Inspect the Vehicle",
        text: "When you pick up the car, inspect it for any existing scratches or damages and ensure they are reported. This helps avoid disputes when returning the vehicle.",
      },
      {
        title: "Plan Your Route",
        text: "Use a reliable navigation app and plan your route in advance. This saves time, helps you avoid traffic, and makes your trip smoother and more enjoyable.",
      },
    ],
    note: "A hassle-free car rental experience is all about the right planning, clear communication, and choosing a trusted rental provider. Follow these simple tips and enjoy a smooth, safe, and memorable journey.",
  },
  {
    slug: "top-weekend-getaways-near-you",
    day: "28",
    monthYear: "Jul 2026",
    date: "July 28, 2026",
    category: "Destination Guide",
    title: "Top 7 Weekend Getaways Near You",
    description:
      "Discover the best weekend destinations for a quick and refreshing break. Perfect for families, couples and solo travellers.",
    image: "/automotive/images/blog/getaways.jpg",
    intro:
      "A short weekend escape can do wonders to recharge your mind and body. With the right car and a little planning, you can swap the city noise for mountains, lakes or beaches in just a few hours of driving.",
    steps: [
      {
        title: "Pick a Destination Within a Few Hours",
        text: "Choose places within a 3–5 hour drive so you spend more time enjoying the destination and less time on the road.",
      },
      {
        title: "Hill Stations for Cool Weather",
        text: "Mountain towns offer fresh air, scenic viewpoints and cosy stays — perfect for couples and families looking to relax.",
      },
      {
        title: "Lakeside Retreats",
        text: "Calm lakes are ideal for sunset drives, boating and picnics. Book a lakeside stay in advance during holidays.",
      },
      {
        title: "Beach Escapes",
        text: "Coastal roads make for beautiful drives. Leave early to beat traffic and enjoy the sunrise along the shore.",
      },
      {
        title: "Pack Light and Smart",
        text: "Carry essentials only — water, snacks, a first-aid kit and phone chargers — so your trip stays comfortable and flexible.",
      },
    ],
    note: "The best weekend getaways are the ones you actually take. Choose a comfortable car, plan a flexible route and enjoy the journey as much as the destination.",
  },
  {
    slug: "how-to-choose-the-right-car-for-your-trip",
    day: "10",
    monthYear: "Jul 2026",
    date: "July 10, 2026",
    category: "Car Rental Advice",
    title: "How to Choose the Right Car for Your Trip",
    description:
      "From budget cars to luxury SUVs, learn how to choose the perfect vehicle based on your travel needs and preferences.",
    image: "/automotive/images/blog/choose-car.jpg",
    intro:
      "The car you choose can make or break your trip. The right vehicle keeps everyone comfortable, fits your luggage and suits the roads you'll be driving on — without stretching your budget.",
    steps: [
      {
        title: "Count Your Passengers",
        text: "Hatchbacks and sedans are great for up to four people, while SUVs and MUVs like the Innova comfortably seat six to seven.",
      },
      {
        title: "Consider Your Luggage",
        text: "Long trips mean more bags. Make sure the boot space is enough so nobody has to travel with suitcases on their lap.",
      },
      {
        title: "Think About the Terrain",
        text: "City roads suit compact cars, but hilly or rough routes call for SUVs with better ground clearance.",
      },
      {
        title: "Manual or Automatic",
        text: "Automatics are easier in heavy traffic, while manuals can be more economical. Pick what you're most comfortable driving.",
      },
      {
        title: "Set a Budget",
        text: "Compare daily rates, fuel efficiency and included kilometres to find the best value for your trip.",
      },
    ],
    note: "Not sure which car fits your plans? Our team is happy to recommend the perfect vehicle based on your route, group size and budget.",
  },
  {
    slug: "scenic-coastal-drives-you-must-experience",
    day: "24",
    monthYear: "Jun 2026",
    date: "June 24, 2026",
    category: "Travel Tips",
    title: "Scenic Coastal Drives You Must Experience",
    description:
      "Breathtaking sea views, winding roads and golden sunsets — our favourite coastal routes for an unforgettable drive.",
    image: "/automotive/images/about-car.jpg",
    intro:
      "Few experiences beat a drive along the coast with the windows down and the sea stretching to the horizon. Here's how to make the most of your next coastal road trip.",
    steps: [
      {
        title: "Time It for Sunset",
        text: "Plan your drive so you reach the most scenic stretch during golden hour for unforgettable views and photos.",
      },
      {
        title: "Choose a Comfortable SUV",
        text: "Coastal roads can be winding. An SUV offers better visibility, comfort and stability on curves.",
      },
      {
        title: "Stop at Viewpoints",
        text: "Don't rush. Plan stops at viewpoints, beaches and local cafés along the route.",
      },
      {
        title: "Check the Weather",
        text: "Monsoon and storms can make coastal roads slippery. Always check the forecast before you set off.",
      },
      {
        title: "Drive Safely on Curves",
        text: "Keep to speed limits, avoid overtaking on blind turns and use your horn on sharp bends.",
      },
    ],
    note: "A coastal drive is about the journey, not just the destination. Take it slow, soak in the views and let the road do the rest.",
  },
  {
    slug: "planning-the-perfect-camping-road-trip",
    day: "12",
    monthYear: "Jun 2026",
    date: "June 12, 2026",
    category: "Destination Guide",
    title: "Planning the Perfect Camping Road Trip",
    description:
      "Everything you need to know about packing, routes and choosing the right vehicle for a relaxing camping getaway.",
    image: "/automotive/images/how-it-works.jpg",
    intro:
      "Camping road trips combine the freedom of driving with the joy of sleeping under the stars. With good preparation, they can be the most memorable trips of all.",
    steps: [
      {
        title: "Choose a Spacious Vehicle",
        text: "You'll need room for tents, sleeping bags and supplies. An SUV or MUV gives you the space you need.",
      },
      {
        title: "Research Campsites",
        text: "Look for campsites with basic facilities and check whether permits or advance bookings are required.",
      },
      {
        title: "Make a Packing Checklist",
        text: "Tent, torch, power bank, cooking kit, water and warm clothes — a checklist makes sure nothing is left behind.",
      },
      {
        title: "Fuel Up Before Remote Stretches",
        text: "Fuel stations can be scarce near campsites. Fill your tank whenever you get the chance.",
      },
      {
        title: "Leave No Trace",
        text: "Carry your waste back with you and respect nature so the campsite stays beautiful for everyone.",
      },
    ],
    note: "With the right car and a little preparation, a camping road trip becomes an adventure you'll talk about for years.",
  },
  {
    slug: "why-renting-from-a-trusted-provider-matters",
    day: "30",
    monthYear: "May 2026",
    date: "May 30, 2026",
    category: "Car Rental Advice",
    title: "Why Renting From a Trusted Provider Matters",
    description:
      "Well-maintained cars, transparent pricing and 24/7 support — what to look for before you book your next rental.",
    image: "/automotive/images/showroom.jpg",
    intro:
      "Cheap deals can be tempting, but the rental company you choose affects your safety, comfort and peace of mind. Here's what to look for before you book.",
    steps: [
      {
        title: "Well-Maintained Vehicles",
        text: "Trusted providers service their cars regularly, so you're less likely to face breakdowns on the road.",
      },
      {
        title: "Transparent Pricing",
        text: "Look for clear quotes with no hidden fees for fuel, kilometres, tolls or late returns.",
      },
      {
        title: "Proper Insurance",
        text: "Make sure the vehicle is fully insured and understand what is covered in case of damage.",
      },
      {
        title: "24/7 Support",
        text: "Round-the-clock assistance means help is always a phone call away if something goes wrong.",
      },
      {
        title: "Genuine Reviews",
        text: "Check customer reviews and ratings to understand the real experience of past renters.",
      },
    ],
    note: "Choosing a trusted rental partner like Rydora means reliable cars, honest pricing and support whenever you need it.",
  },
];

export function getBlogBySlug(slug: string) {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogCategories() {
  const firstPost = new Map<string, string>();
  for (const b of blogs) if (!firstPost.has(b.category)) firstPost.set(b.category, b.slug);
  return [...firstPost.entries()].map(([name, slug]) => ({ name, slug }));
}
