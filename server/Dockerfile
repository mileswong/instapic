FROM python:3.7
LABEL maintainer="mileswonghowing@gmail.com"

ENV FLASK_ENV=production

COPY requirements.txt /requirements.txt
RUN pip install -r requirements.txt

ARG FLASK_HOME=/app

COPY instapic /app/instapic

WORKDIR /app

EXPOSE 8000

CMD gunicorn "instapic.app:create_app()" --timeout 300
