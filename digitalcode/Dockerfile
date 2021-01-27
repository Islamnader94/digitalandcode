FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /app/digitalcode
COPY requirements.txt /app/digitalcode
RUN pip install -r requirements.txt
COPY . /app/digitalcode