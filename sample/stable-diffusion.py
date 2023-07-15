from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
import torch

model_id = "stabilityai/stable-diffusion-2-1"

pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe = pipe.to("mps" if torch.backends.mps.is_available() else "cpu")
# pipe = pipe.to("cuda")

f = open("sentences")
prompt = f.readline()
i = 0
while prompt:
  image = pipe(prompt).images[0]
  image.save("images/%d.png"%i)
  i += 1
  prompt = f.readline()
f.close()
