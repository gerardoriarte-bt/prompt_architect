export interface Option {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  options: Option[];
  isVideoOnly?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'framing',
    name: 'Framing (Planos)',
    description: 'Define qué tanto del sujeto o entorno vemos.',
    options: [
      { id: 'ecu', label: 'Extreme Close-up (ECU)', value: 'Extreme Close-up, maximum detail, eyes, textures' },
      { id: 'cu', label: 'Close-up (CU)', value: 'Close-up, face and shoulders' },
      { id: 'ms', label: 'Medium Shot (MS)', value: 'Medium Shot, waist up' },
      { id: 'fs', label: 'Full Shot (FS)', value: 'Full Shot, full body in environment' },
      { id: 'ls', label: 'Long Shot (LS)', value: 'Long Shot, environment focused, subject small' },
      { id: 'bev', label: 'Bird’s Eye View', value: 'Bird’s Eye View, top-down 90 degrees' },
      { id: 'low', label: 'Low Angle', value: 'Low Angle, powerful perspective' },
      { id: 'high', label: 'High Angle', value: 'High Angle, vulnerable perspective' },
    ]
  },
  {
    id: 'aspect',
    name: 'Aspect Ratio',
    description: 'Define las proporciones de la imagen o video.',
    options: [
      { id: '16_9', label: '16:9 (Widescreen)', value: '--ar 16:9, widescreen aspect ratio' },
      { id: 'cinemascope', label: '2.35:1 (Cinemascope)', value: '--ar 2.35:1, cinemascope, ultra-wide cinematic format' },
      { id: '1_1', label: '1:1 (Square)', value: '--ar 1:1, square aspect ratio' },
      { id: '9_16', label: '9:16 (Vertical)', value: '--ar 9:16, vertical aspect ratio, mobile format' },
    ]
  },
  {
    id: 'movement',
    name: 'Movement (Movimiento)',
    description: 'Define cómo se traslada el ojo (Solo Video).',
    isVideoOnly: true,
    options: [
      { id: 'static', label: 'Static', value: 'Static camera, no movement' },
      { id: 'pan', label: 'Pan', value: 'Horizontal pan' },
      { id: 'tilt', label: 'Tilt', value: 'Vertical tilt' },
      { id: 'dolly', label: 'Dolly In/Out', value: 'Dolly in and out' },
      { id: 'truck', label: 'Trucking', value: 'Lateral trucking following subject' },
      { id: 'crane', label: 'Crane/Drone', value: 'Wide sweeping crane shot' },
      { id: 'handheld', label: 'Handheld', value: 'Handheld camera, realistic urgency' },
      { id: 'zoom', label: 'Cinematic Zoom', value: 'Cinematic zoom in and out with smooth transition' },
    ]
  },
  {
    id: 'color',
    name: 'Color & Grading',
    description: 'Define el "look" visual y emocional.',
    options: [
      { id: 'teal', label: 'Teal and Orange', value: 'Teal and Orange cinematic color grading, high contrast' },
      { id: 'mono', label: 'Monochromatic', value: 'Monochromatic color scale' },
      { id: 'sat', label: 'High Saturation', value: 'Vibrant high saturation colors' },
      { id: 'desat', label: 'Desaturated', value: 'Washed out desaturated colors' },
      { id: 'cyber', label: 'Cyberpunk Neon', value: 'Cyberpunk neon, magenta and cyan contrasts' },
      { id: 'pastel', label: 'Pastel Tones', value: 'Soft pastel tones, Wes Anderson aesthetic' },
      { id: 'noir', label: 'Film Noir', value: 'Film Noir, high contrast black and white, harsh shadows' },
    ]
  },
  {
    id: 'lighting',
    name: 'Lighting (Iluminación)',
    description: 'La luz es lo que da profundidad y realismo.',
    options: [
      { id: 'golden', label: 'Golden Hour', value: 'Golden hour, warm soft sunset light' },
      { id: 'volumetric', label: 'Volumetric', value: 'Volumetric lighting, light rays through dust or fog' },
      { id: 'rembrandt', label: 'Rembrandt', value: 'Rembrandt lighting, dramatic side light' },
      { id: 'softbox', label: 'Softbox', value: 'Softbox diffused light, no harsh shadows' },
      { id: 'rim', label: 'Backlighting', value: 'Cinematic backlighting, rim light' },
      { id: 'neon', label: 'Neon/Harsh', value: 'Neon harsh artificial light' },
    ]
  },
  {
    id: 'speed',
    name: 'Speed & FPS',
    description: 'Define la sensación de fluidez o tiempo.',
    options: [
      { id: 'slow', label: 'Slow Motion', value: 'Slow motion, 60fps/120fps, epic fluid movement' },
      { id: 'realtime', label: 'Real-time', value: 'Real-time 24fps, cinematic motion blur' },
      { id: 'timelapse', label: 'Time-lapse', value: 'Time-lapse, accelerated movement' },
      { id: 'blur', label: 'Motion Blur', value: 'Motion blur, sense of speed' },
    ]
  },
  {
    id: 'environment',
    name: 'Environment (Entorno)',
    description: 'El contexto de la escena.',
    options: [
      { id: 'overcast', label: 'Overcast/Foggy', value: 'Overcast, foggy, mysterious atmosphere' },
      { id: 'rain', label: 'Heavy Rain', value: 'Heavy rain, stormy, wet surfaces' },
      { id: 'arid', label: 'Arid/Dusty', value: 'Arid, dusty, floating dust particles' },
      { id: 'gold_part', label: 'Golden Particles', value: 'Floating golden particles, fantasy luxury' },
      { id: 'post_apoc', label: 'Post-apocalyptic', value: 'Post-apocalyptic ruins' },
      { id: 'pristine', label: 'Pristine', value: 'Pristine and clean environment' },
    ]
  },
  {
    id: 'effects',
    name: 'Cinematic Effects',
    description: 'Efectos visuales de lente y post-procesado.',
    options: [
      { id: 'flares', label: 'Lens Flares', value: 'cinematic lens flares, anamorphic flares, light leaks' },
      { id: 'bokeh', label: 'Bokeh', value: 'deep bokeh, soft blurred background, shallow depth of field, high quality blur' },
      { id: 'mblur', label: 'Motion Blur', value: 'dynamic motion blur, fast action sense, cinematic motion blur' },
    ]
  },
  {
    id: 'style',
    name: 'Style (Estilo)',
    description: 'Referencia a la calidad de la lente o tecnología.',
    options: [
      { id: 'photoreal', label: 'Photorealistic', value: '8k, photorealistic, Unreal Engine 5, maximum detail' },
      { id: 'anamorphic', label: 'Anamorphic', value: 'Anamorphic lens, wide format, horizontal flares' },
      { id: 'vintage', label: 'Vintage 35mm', value: 'Vintage 35mm film, film grain, 80s 90s aesthetic' },
      { id: 'imax', label: 'IMAX Style', value: 'IMAX style, large scale, extreme sharpness, deep field of view' },
      { id: 'macro', label: 'Macro', value: 'Macro photography, extreme focus on small objects' },
      { id: 'filmlook', label: 'Film Look', value: 'cinematic film look, subtle film grain, 35mm film aesthetic' },
    ]
  }
];

export const DEFAULT_NEGATIVE_PROMPT = "deformed, blurry, low quality, low resolution, extra limbs, distorted face, bad anatomy, watermark, text, signature, grainy, out of focus";

export interface Template {
  id: string;
  name: string;
  subject: string;
  selections: Record<string, string>;
}

export const TEMPLATES: Template[] = [
  {
    id: 'scifi-landscape',
    name: 'Sci-Fi Landscape',
    subject: 'A sprawling futuristic megacity on a distant planet, massive skyscrapers, flying vehicles, multiple moons in the sky',
    selections: {
      framing: 'ls',
      color: 'cyber',
      lighting: 'volumetric',
      environment: 'overcast',
      style: 'imax'
    }
  },
  {
    id: 'fantasy-character',
    name: 'Fantasy Character',
    subject: 'An ancient elven warrior in ornate silver armor, standing in a mystical forest, holding a glowing sword',
    selections: {
      framing: 'ms',
      color: 'pastel',
      lighting: 'golden',
      environment: 'gold_part',
      style: 'photoreal'
    }
  },
  {
    id: 'noir-detective',
    name: 'Noir Detective',
    subject: 'A detective in a trench coat and hat, standing under a street lamp in a rainy alley, smoking a cigarette',
    selections: {
      framing: 'ms',
      color: 'noir',
      lighting: 'rembrandt',
      environment: 'rain',
      style: 'vintage'
    }
  }
];
