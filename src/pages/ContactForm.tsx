import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    function onSubmit(data: ContactFormData) {
        console.log("Form submitted:", data)
    }

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Contact Form</PageHeaderHeading>
            </PageHeader>
            <Card>
                <CardHeader>
                    <CardTitle>React Hook Form + Zod Demo</CardTitle>
                    <CardDescription>
                        Form validation using React Hook Form with Zod schema resolver.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitSuccessful ? (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Form submitted successfully! Check the console for submitted data.
                            </p>
                            <Button variant="outline" onClick={() => reset()}>
                                Submit another
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    aria-invalid={!!errors.name}
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    aria-invalid={!!errors.email}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    placeholder="What is this about?"
                                    aria-invalid={!!errors.subject}
                                    {...register("subject")}
                                />
                                {errors.subject && (
                                    <p className="text-sm text-destructive">{errors.subject.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Your message..."
                                    rows={4}
                                    aria-invalid={!!errors.message}
                                    {...register("message")}
                                />
                                {errors.message && (
                                    <p className="text-sm text-destructive">{errors.message.message}</p>
                                )}
                            </div>

                            <Button type="submit">Send Message</Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </>
    )
}
