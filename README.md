### Install

```
pip install -r requirements.txt
```

### Sample

Stable Diffusion (v2-1-base Model Card)

https://huggingface.co/stabilityai/stable-diffusion-2-1-base?text=rabbit+on+the+building

```
python sample/stable-diffusion.py
```

### Add dependencies

신규 패키지가 추가되었을 때 아래 명령어를 입력하여 requirements.txt 를 업데이트 해준다.

```bash
pip list --format=freeze > requirements.txt
```
