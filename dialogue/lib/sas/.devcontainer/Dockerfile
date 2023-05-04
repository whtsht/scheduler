FROM rust:latest

WORKDIR /app

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt-get update \
    && groupadd --gid $USER_GID $USERNAME \
    && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && apt-get -y install locales \
    && localedef -f UTF-8 -i ja_JP ja_JP.UTF-8

RUN curl https://clrd.ninjal.ac.jp/unidic_archive/2302/unidic-cwj-202302.zip --output unidic.zip \
    && unzip unidic.zip -d unidic \
    && mv unidic /var \
    && rm -f unidic.zip

RUN apt-get -y install curl vim git libmecab-dev

RUN rustup component add rustfmt

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm
