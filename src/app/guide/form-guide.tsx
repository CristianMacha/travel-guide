'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { generativeIa } from "@/actions/generative-ia"
import { useState } from "react"

const formSchema = z.object({
    origin: z.string().min(1, { message: "Please enter a valid origin" }),
    destination: z.string().min(1, { message: "Please enter a valid destination" }),
    description: z.string().min(0),
}).refine(data => data.origin !== data.destination, {
    message: "El pais de destino no puede ser el mismo que el pais de origen",
    path: ["destination"],
})

export default function FormGuide() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            origin: "peru",
            destination: "chile",
            description: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            await generativeIa(values.origin, values.destination, values.description);
        } catch (error) {
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField control={form.control} name="origin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Origen</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar pais de origen" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="peru">Perú</SelectItem>
                                    <SelectItem value="chile">Chile</SelectItem>
                                    <SelectItem value="argentina">Argentina</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField control={form.control} name="destination"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Destino</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar pais destino" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="peru">Perú</SelectItem>
                                    <SelectItem value="chile">Chile</SelectItem>
                                    <SelectItem value="argentina">Argentina</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row gap-2">
                    <Button
                        type="submit"
                        className="w-full md:w-auto"
                        disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar"}
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/">Cancel</Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}