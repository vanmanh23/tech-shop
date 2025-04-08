'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema } from '@/lib/validations/product';
import ImageUpload from './ImageUpload';

export default function ProductForm() {
  const [imageUrl, setImageUrl] = useState('');

  const { handleSubmit } = useForm({
    resolver: zodResolver(createProductSchema)
  });
  // const { handleSubmit, formState: { errors } } = useForm({
  //   resolver: zodResolver(createProductSchema)
  // });

  const onSubmit = async (data: any) => {
    const productData = {
      ...data,
      image: imageUrl
    };

    // Submit product data to API
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    // Handle response...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ImageUpload
        value={imageUrl}
        onChange={setImageUrl}
      />
      
      {/* Other form fields */}
    </form>
  );
} 