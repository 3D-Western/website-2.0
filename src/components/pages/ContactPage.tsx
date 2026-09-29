'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { koulen } from '@/lib/fonts';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';


export function ContactPage() {
	const [result, setResult] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [inquiryType, setInquiryType] = useState<string>('');

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		setResult('');

		const form = event.currentTarget;
		const formData = new FormData(form);
		formData.set('access_key', 'fc11578d-569b-460c-891d-31af60b82f6c'); // client-side key for web3forms.com

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			if (response.ok && data?.success) {
				setResult("Success! We&apos;ll get back to you soon.");
				form.reset();
				setInquiryType('');
			} else {
				setResult('Error submitting form. Please try again.');
			}
		} catch {
			setResult('Error submitting form. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};


	return (
		<main className="min-h-screen pt-[88px]">
			{/* Header */}
			<section className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						className={`font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 ${koulen.className}`}
					>
						Contact Us
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className="text-xl text-muted-foreground max-w-2xl"
					>
						Have questions? Want to collaborate? We&apos;d love to hear from you.
					</motion.p>
				</div>
			</section>

			{/* Inquiry Types */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">How Can We Help?</h2>
					</div>


					{/* Contact Form */}
					<div className="w-full sm:w-3/5 mx-auto">
						<Card>
							<CardHeader>
								<CardTitle>*We will get back to you within 1-2 business days.</CardTitle>
							</CardHeader>
							<CardContent>
								<form className="space-y-6" onSubmit={onSubmit}>
									{/* Radix Select isn't a native form control, so mirror its value into a hidden input */}
									<input type="hidden" name="inquiryType" value={inquiryType} />

									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="firstName">
												First Name <span className="text-red-500" aria-label="required">*</span>
											</Label>
											<Input id="firstName" name="firstName" placeholder="John" required />
										</div>
										<div className="space-y-2">
											<Label htmlFor="lastName">
												Last Name <span className="text-red-500" aria-label="required">*</span>
											</Label>
											<Input id="lastName" name="lastName" placeholder="Doe" required />
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="email">
										Email <span className="text-red-500" aria-label="required">*</span>
									</Label>
										<Input id="email" name="email" type="email" placeholder="john.doe@uwo.ca" required />
									</div>

									<div className="space-y-2">
										<Label htmlFor="inquiryType">
										Inquiry Type <span className="text-red-500" aria-label="required">*</span>
									</Label>
										<Select value={inquiryType} onValueChange={setInquiryType}>
											<SelectTrigger
												id="inquiryType"
												className="bg-white"
											>
												<SelectValue placeholder="Select inquiry type" />
											</SelectTrigger>
											<SelectContent className="bg-white">
												<SelectItem value="organization">Organization Booking</SelectItem>
												<SelectItem value="student">Student Inquiry</SelectItem>
												<SelectItem value="sponsor">Sponsor Inquiry</SelectItem>
												<SelectItem value="general">General Inquiry</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="subject">
										Subject <span className="text-red-500" aria-label="required">*</span>
									</Label>
										<Input id="subject" name="subject" placeholder="Brief description of your inquiry" required />
									</div>

									<div className="space-y-2">
										<Label htmlFor="message">
										Message <span className="text-red-500" aria-label="required">*</span>
									</Label>
										<Textarea
											id="message"
											name="message"
											placeholder="Tell us more about your inquiry..."
											rows={6}
											required
										/>
									</div>

									<div className="flex justify-center mt-6">
										<Button
											type="submit"
											className="hover:bg-purple-50 hover:text-purple-700"
											size="lg"
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Sending...
												</>
											) : (
												'Send Message'
											)}
										</Button>
									</div>

									{result && (
										<div role="status" aria-live="polite" className="text-sm text-muted-foreground text-center">
											{result}
										</div>
									)}
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* NOTE: original Location & Hours and map placeholder taken out
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl mb-6">Visit Us</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    Morrissette Entrepreneurship Building<br />
                    Western University<br />
                    London, Ontario, Canada
                  </p>
                </div>

                <div>
                  <h3 className="mb-2">Office Hours</h3>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Monday - Thursday: 9:00 AM - 5:00 PM</p>
                    <p>Friday: 9:00 AM - 4:00 PM</p>
                    <p>Saturday - Sunday: By appointment only</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:contact@uwo.ca" className="text-purple-600 hover:underline">
                      contact@uwo.ca
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-200 rounded-2xl flex items-center justify-center aspect-square lg:aspect-auto">
              <p className="text-muted-foreground">Map Placeholder</p>
            </div>
          </div>
        </div>
      </section> */}

			{/* FAQ Link */}
			<section className="py-10 bg-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl mb-4">Have a Quick Question?</h2>
					<p className="text-lg text-muted-foreground mb-8">
						Check out our FAQ section - you might find the answer you&apos;re looking for!
					</p>
					<Link href="/#faq">
						<Button size="lg" variant="outline" className="hover:bg-purple-50 hover:text-purple-700">
							View FAQs
						</Button>
					</Link>
				</div>
			</section>
		</main>
	);
}