'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import CloneRegistrationForm from "./CloneRegistrationForm";
import { useActionState, useState } from "react";
import { registrationMovies } from "@/lib/actions/registrationMovies";
import { Input } from '@/components/ui/input';


export default function RegistrationForm() {   
    const [forms, setForms] = useState<number[]>([0]);

    const [state, formAction] = useActionState(registrationMovies, {
        success: false, errors: {}
    })

    const handleAddForm = () => {
        setForms([...forms, Date.now() + Math.random()]);
    };

    const handleRemoveForm = (id: number) => {
        setForms(prev => prev.filter((formId) => formId !== id));
    };
    console.log(state);

  return (
    <Card className="w-full max-w-4/5 sm:max-w-1/2 mx-auto bg-black text-white">
        <CardHeader className="mt-5">
            <CardTitle className="line-clamp-2 text-white">DVD 情報入力</CardTitle>
        </CardHeader>
        <CardContent>
            <form action={formAction} className='space-y-4'>

                {forms.map((formId) => {
                    const errors = state.errors[String(formId)] ?? [];
                    // console.log(state.errors[String(formId)]);
                    
                    return (
                        <div key={formId}>
                            <CloneRegistrationForm
                                formId={formId}
                                onRemove={formId !== 0 ? () => handleRemoveForm(formId) : undefined}
                            />
                            {errors.length > 0 && (
                                <ul className="text-red-500 mt-2 text-sm list-disc list-inside">
                                {errors.map((err, i) => (
                                    <li key={i}>※ {err}</li>
                                ))}
                                </ul>
                            )}
                        </div>
                    );
                })}


                <Input type="hidden" name="formIds" value={forms.join(',')} />

                <div>
                    <Button type='button' className='w-1/5 bg-green-700 hover:bg-green-600 text-white mr-5'
                        onClick={handleAddForm}
                    >
                        add
                    </Button>
                    <Button type='submit' className='w-1/2 bg-red-800 hover:bg-red-700 text-white'>
                        Register DVD
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
  )
}
