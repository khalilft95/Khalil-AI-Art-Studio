import { GoogleGenAI, Modality } from "@google/genai";
import { ArtStyle } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const generateArt = async (imageFile: File, style: ArtStyle): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const base64Data = await fileToBase64(imageFile);

  let prompt: string;

  if (style === ArtStyle.SCRIBBLE) {
    prompt = "A black-and-white scribble-style drawing of the subject from the uploaded image. The drawing should be rendered in messy, overlapping ink lines that form the delicate details of the subject's features and texture. The background should be plain white, emphasizing the subject without distractions. The style should be hand-drawn, artistic, and slightly abstract, with rich texture and depth created by the numerous lines. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.POP) {
    prompt = "Transform the uploaded image into a modern pop art comic illustration. The style should be a modern vector style with crisp black lines. Use a bright and contrasting color palette (yellow, pink, red, turquoise, and natural skin tones). The lighting should be clean and stylish, creating comic-style light and shadow. The background should feature gradient pops or geometric textures to enhance the energy of the portrait. The overall tone should be bold, confident, and expressive, while maintaining a natural facial resemblance and realistic lighting direction. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.VECTOR) {
    prompt = "Create a vibrant, high-detail digital portrait illustration of a character in reference, in the style of a modern vector comic. Emphasize clean lines, strong shadows, and reflective highlights on the face. Add dynamic brush stroke textures and abstract white background elements like splashes and dots. Conserve the expression of the person. Include lighting contrast between warm and cool tones on the face. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.VECTOR_V1) {
    prompt = "A digital illustration of the subject from the uploaded image in a bold vector art style, portrait ratio 3:4. The subject should have natural skin and a confident, conserved expression. The background is a gradient of deep orange to dark brown, enhancing the dramatic lighting and shadows on the face. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.VECTOR_V2) {
    prompt = "Create a vector illustration of the subject from the uploaded image, depicted with graphic line art. The style should have a clean, modern aesthetic with strong graphic elements, reminiscent of pop art or screen printing techniques. Use a starkly contrasting color palette with a solid color background (like reddish-pink) and defining lines in colors like teal and white. The final artwork should be a stylized portrait. Preserve the subject's main shape, features, and expression from the original image. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.VECTOR_V3) {
    prompt = "Create a digital vector art illustration of the subject from the uploaded image. The style should have bold, clean black outlines of consistent weight and cell-shading (using flat, non-graduated color blocks for shadow and light), resembling a graphic novel or modern pop art. Use vibrant colors for the skin tones and clothing. The final look must be high contrast and highly polished, with dramatic, sharp highlights on the nose, forehead, and cheekbones. The background should be a flat, clean white. Preserve the subject's main shape, features, and expression from the original image. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.VECTOR_V4) {
    prompt = "A highly detailed vector art portrait focusing on the head and shoulders of the subject from the uploaded image. The illustration is rendered in a high-impact, stylized comic book/sports graphic style, featuring: Bold, clean black outlines defining all major shapes, shadows, and facial features. Highly stylized, sharp, angular shading (cel-shading with no gradients) to create dramatic, chiseled contours and shadows under the brow, cheekbones, and jaw. A limited, saturated color palette. The subject's expression should be conserved from the original image. The lighting is dramatic and high-contrast, emphasizing the sharp, graphic shadows. No background texture—isolated on a solid white or transparent background. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.VECTOR_V5) {
    prompt = "Create an illustration of the subject from the uploaded image in the style of a modern pop art vector portrait, featuring bold, flat color blocks and minimal shading. The palette should be limited to 2-3 contrasting colors (e.g., deep blue, muted red, and white/cream). Use sharp, graphic lines and a clean, contemporary illustration style. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.VECTOR_V6) {
    prompt = "Make a vector illustration of the subject from the uploaded image in the style of cel-shading and poster art, featuring bold, thick black outlines and stark solid color blocks for shading. It should be a close-up dramatic portrait that conserves expression, with a minimalistic color palette and a white background. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.DRAWING) {
    prompt = "Create a striking black-and-white woodcut or linocut-style illustration of the person from the uploaded photo in a close-up portrait. The artwork should feature bold, contrasting lines and shading, characteristic of traditional printmaking techniques. Capture the subject's expression with intensity, using deep lines to convey emotion and character. The background should be simple to keep the focus on the subject. The overall effect should be dramatic and timeless. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.WPOP) {
    prompt = "WPAP style portrait of the subject from the uploaded image. Extremely bold and vibrant colors, utilizing a graphic, fragmented look where the subject's features are defined by sharp, polygonal color blocks. The background should have simple, bold color blocking, similar to the style of Andy Warhol's Pop Art meeting geometric abstraction. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else if (style === ArtStyle.LOW_POLY_VECTOR) {
    prompt = "A low-poly vector portrait of the subject from the uploaded image. The art style should feature distinct, large geometric facets and planes instead of smooth blending, creating a sharp, mosaic-like appearance. Use a limited color palette with flat, solid colors for each facet. The lighting should be high contrast to emphasize the sharp angles and shadows. The subject should be depicted in a close-up shot with a clean white or blank background. Preserve the subject's main shape and details. Generate the final artwork in high resolution 4K PNG format.";
  } else {
    prompt = `Transform this product image into ${style}. Preserve the product’s main shape and details while applying the chosen artistic filter. The background should be simple and complementary to the new style. Generate the final artwork in high resolution 4K PNG format.`;
  }

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: imageFile.type,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    throw new Error("No image was generated by the API. The response may have been blocked.");
  } catch (error) {
    console.error("Error generating art:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate art: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating art.");
  }
};