import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Award, Users, Target, Heart, Star, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const About = () => {
  const [expandedValue, setExpandedValue] = useState(null);

  const timeline = [
    {
      year: '2010',
      title: 'RTS Reliable Tax Services Founded',
      description: 'Started serving the Victoria community with personalized tax preparation services.',
      icon: '🌱'
    },
    {
      year: '2015',
      title: 'Walia Tax Services Opens',
      description: 'Expanded to Surrey to serve the growing immigrant and business community in the Lower Mainland.',
      icon: '🚀'
    },
    {
      year: '2018',
      title: 'LMIA & Immigration Support Added',
      description: 'Recognized the need for immigration document support and became trusted LMIA advisors.',
      icon: '🌍'
    },
    {
      year: '2022',
      title: 'Full Bookkeeping & Payroll',
      description: 'Expanded services to include comprehensive bookkeeping and payroll processing for businesses.',
      icon: '📊'
    },
    {
      year: '2025',
      title: 'Gator Bookkeeping Launches',
      description: 'Bringing our trusted services online with secure document upload, real-time updates, and 24/7 access.',
      icon: '🐊'
    }
  ];

  const team = [
    {
      name: 'Joey Walia',
      role: 'Founder & Tax Expert',
      bio: 'With over 15 years of experience in Canadian tax law, Joey has helped thousands of individuals and businesses maximize their returns and stay compliant.',
      expertise: ['Corporate Tax', 'LMIA Applications', 'CRA Audits', 'Tax Planning'],
      image: '👨‍💼'
    },
    {
      name: 'Accounting Team',
      role: 'Certified Tax Preparers',
      bio: 'Our team of certified accountants and tax preparers brings decades of combined experience across personal, corporate, and international taxation.',
      expertise: ['Personal Tax', 'Bookkeeping', 'GST/HST', 'Payroll'],
      image: '👥'
    },
    {
      name: 'Immigration Specialists',
      role: 'LMIA & PR Document Experts',
      bio: 'Dedicated specialists who understand the complexities of Canadian immigration and work permits, ensuring your documentation is complete and compliant.',
      expertise: ['LMIA Applications', 'Work Permits', 'PR Documents', 'ECA Guidance'],
      image: '🌐'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Client-First Always',
      description: 'Your success is our success. We go the extra mile to ensure you get every deduction and credit you deserve.',
      details: 'We don\'t just file your taxes - we advocate for you. Our team reviews every return multiple times to catch opportunities others miss. We\'re available year-round, not just during tax season.'
    },
    {
      icon: Award,
      title: 'Accuracy Guaranteed',
      description: 'We stand behind every return we file. If there\'s an error on our part, we cover any penalties or interest.',
      details: '100% accuracy guarantee means peace of mind. Our multi-step review process and use of professional tax software ensures your return is correct the first time. We\'ve never had a client penalized due to our error.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Proud to serve Victoria, Surrey, and surrounding communities with personalized, accessible tax services.',
      details: 'We understand the unique needs of BC residents and businesses. From the tech workers in Victoria to the diverse immigrant communities in Surrey, we speak your language (literally - our team is multilingual).'
    },
    {
      icon: Target,
      title: 'Transparent Pricing',
      description: 'No hidden fees, no surprises. You get a quote upfront and only pay when you\'re 100% satisfied.',
      details: 'You\'ll know exactly what you\'re paying before we start. Our pricing is based on complexity, not your refund amount. And with our satisfaction guarantee, if you\'re not happy, we\'ll make it right or refund you.'
    }
  ];

  const locations = [
    {
      name: 'RTS Reliable Tax Services',
      city: 'Victoria, BC',
      address: '123 Main Street, Victoria, BC V8W 1A1',
      phone: '(250) 555-0123',
      email: 'victoria@gatorbookkeeping.ca',
      hours: [
        { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
        { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
        { day: 'Sunday', time: 'Closed' }
      ],
      services: ['Personal Tax', 'Corporate Tax', 'Bookkeeping', 'Payroll', 'CRA Audit Support'],
      mapEmbed: '🗺️'
    },
    {
      name: 'Walia Tax Services',
      city: 'Surrey, BC',
      address: '456 Fraser Highway, Surrey, BC V3T 2K5',
      phone: '(604) 555-0456',
      email: 'surrey@gatorbookkeeping.ca',
      hours: [
        { day: 'Monday - Friday', time: '9:00 AM - 7:00 PM' },
        { day: 'Saturday', time: '9:00 AM - 5:00 PM' },
        { day: 'Sunday', time: '11:00 AM - 3:00 PM' }
      ],
      services: ['Personal Tax', 'Corporate Tax', 'LMIA Support', 'PR Documents', 'Punjabi & Hindi Services'],
      mapEmbed: '🗺️'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Victoria, BC',
      service: 'Personal Tax Return',
      rating: 5,
      text: 'Joey found $2,400 in deductions my previous accountant missed! He took the time to explain everything and made tax season stress-free.',
      year: '2024'
    },
    {
      name: 'Rajesh P.',
      location: 'Surrey, BC',
      service: 'LMIA Application',
      rating: 5,
      text: 'The immigration team helped us navigate the LMIA process for our restaurant. Approved in 8 weeks! Their attention to detail was incredible.',
      year: '2023'
    },
    {
      name: 'David L.',
      location: 'Vancouver, BC',
      service: 'Corporate Tax & Bookkeeping',
      rating: 5,
      text: 'Switched to Gator for our startup bookkeeping and T2 filing. They saved us money on taxes and their online portal makes everything so easy.',
      year: '2024'
    },
    {
      name: 'Maria G.',
      location: 'Victoria, BC',
      service: 'CRA Audit Assistance',
      rating: 5,
      text: 'I was terrified when I got audited. Joey handled everything with CRA and I ended up owing LESS than expected. Worth every penny.',
      year: '2022'
    },
    {
      name: 'Kevin & Lisa T.',
      location: 'Surrey, BC',
      service: 'Family Tax Returns',
      rating: 5,
      text: 'We\'ve been clients for 5 years. Professional, reliable, and they genuinely care about getting us the best outcome. Highly recommend!',
      year: '2024'
    }
  ];

  const stats = [
    { number: '15+', label: 'Years in Business' },
    { number: '5,000+', label: 'Returns Filed' },
    { number: '$3.2M+', label: 'Tax Savings' },
    { number: '98%', label: 'Client Retention' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gator-green-dark to-gator-green text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="text-6xl mb-6">🐊</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Your Trusted Tax Partner Since 2010
              </h1>
              <p className="text-xl text-white/90 mb-8">
                From humble beginnings in Victoria to serving thousands across BC, we've built our reputation on accuracy,
                integrity, and putting clients first. Now we're bringing that same trusted service online.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="text-3xl font-bold">{stat.number}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Timeline */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-4">Our Journey</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              From a single office to a trusted name across BC, here's how we've grown to serve you better.
            </p>

            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-6 mb-12 relative"
                >
                  {/* Timeline line */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-16 top-20 w-0.5 h-full bg-gator-green/30 -z-10" />
                  )}

                  {/* Year badge */}
                  <div className="flex-shrink-0 w-32">
                    <div className="bg-gator-green-dark text-white rounded-lg px-4 py-2 text-center font-bold">
                      {item.year}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-grow bg-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:border-gator-green transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{item.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-4">Meet Our Team</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Certified professionals with decades of combined experience in Canadian tax law, bookkeeping, and immigration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-2xl font-bold text-navy mb-1">{member.name}</h3>
                  <div className="text-gator-green-dark font-semibold mb-4">{member.role}</div>
                  <p className="text-gray-600 mb-6">{member.bio}</p>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm font-semibold text-navy mb-2">Expertise:</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill, i) => (
                        <span key={i} className="bg-gator-green/10 text-gator-green-dark px-3 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-4">What We Stand For</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              These core values guide every decision we make and every client interaction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                const isExpanded = expandedValue === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setExpandedValue(isExpanded ? null : index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gator-green/10 rounded-full p-3 flex-shrink-0">
                        <Icon className="text-gator-green-dark" size={32} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-navy">{value.title}</h3>
                          {isExpanded ? <ChevronUp className="text-gator-green-dark" /> : <ChevronDown className="text-gator-green-dark" />}
                        </div>
                        <p className="text-gray-600 mb-3">{value.description}</p>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 rounded-lg p-4 border-l-4 border-gator-green"
                          >
                            <p className="text-sm text-gray-700">{value.details}</p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-4">Visit Us</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Two convenient locations serving Victoria and Surrey. Walk-ins welcome during business hours, or book online anytime.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="card hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl mb-4 text-center">{location.mapEmbed}</div>
                  <h3 className="text-2xl font-bold text-navy mb-1">{location.name}</h3>
                  <div className="text-gator-green-dark font-semibold text-xl mb-6">{location.city}</div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-gator-green-dark flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-semibold text-navy">Address</div>
                        <div className="text-gray-600">{location.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="text-gator-green-dark flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-semibold text-navy">Phone</div>
                        <a href={`tel:${location.phone}`} className="text-gator-green-dark hover:underline">{location.phone}</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="text-gator-green-dark flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-semibold text-navy">Email</div>
                        <a href={`mailto:${location.email}`} className="text-gator-green-dark hover:underline">{location.email}</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="text-gator-green-dark flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-semibold text-navy mb-2">Hours</div>
                        {location.hours.map((schedule, i) => (
                          <div key={i} className="text-sm text-gray-600 flex justify-between gap-4">
                            <span>{schedule.day}</span>
                            <span className="font-medium">{schedule.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="font-semibold text-navy mb-2">Services Offered:</div>
                    <div className="flex flex-wrap gap-2">
                      {location.services.map((service, i) => (
                        <span key={i} className="bg-gator-green/10 text-gator-green-dark px-3 py-1 rounded-full text-xs font-medium">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a href="/sign-in" className="btn-primary w-full text-center mt-6">
                    Book Appointment
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-4">What Our Clients Say</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real clients have to say about working with us.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card bg-gray-50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="font-bold text-navy">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                    <div className="text-xs text-gator-green-dark font-medium mt-1">{testimonial.service} • {testimonial.year}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="inline-block bg-gator-green/10 rounded-lg px-6 py-4">
                <div className="text-3xl font-bold text-gator-green-dark mb-1">4.9/5.0</div>
                <div className="text-sm text-gray-600">Average rating from 200+ reviews</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-navy text-center mb-12">Why Choose Gator Bookkeeping?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Brick & Mortar + Online',
                  description: 'The best of both worlds: established physical offices with the convenience of our secure online portal.',
                  icon: '🏢'
                },
                {
                  title: 'Real Local Experts',
                  description: 'We live and work in BC. We understand local tax rules, provincial credits, and community needs.',
                  icon: '🍁'
                },
                {
                  title: 'Multilingual Service',
                  description: 'English, Punjabi, Hindi, and more. We speak your language and understand your unique situation.',
                  icon: '🌏'
                },
                {
                  title: 'Year-Round Support',
                  description: 'Tax questions don\'t stop at tax season. We\'re here 365 days a year to help.',
                  icon: '📅'
                },
                {
                  title: 'Secure & Private',
                  description: 'Bank-level encryption, secure document upload, and strict confidentiality. Your data is safe.',
                  icon: '🔒'
                },
                {
                  title: 'Satisfaction Guaranteed',
                  description: '100% money-back guarantee. If you\'re not happy, we\'ll make it right or refund you.',
                  icon: '💯'
                }
              ].map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-gator-green transition-colors text-center"
                >
                  <div className="text-5xl mb-3">{reason.icon}</div>
                  <h3 className="text-xl font-bold text-navy mb-2">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-gator-green-dark to-gator-green text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Experience the Gator Difference?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied clients who trust us with their taxes, bookkeeping, and immigration needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/sign-in" className="btn-primary bg-white text-gator-green-dark hover:bg-gray-100">
                  Get Started Online
                </a>
                <a href="#locations" className="btn-secondary border-2 border-white text-white hover:bg-white/10">
                  Visit Our Offices
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
