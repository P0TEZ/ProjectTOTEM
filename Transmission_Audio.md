# Transmission Audio

## Contexte

Le premier prototype du projet a été conçu avec une émetteur et un récepteur Haute Fréquence (HF). Plusieurs problèmes ont été constatés avec l'utilisation des HF. Premièrement, il y a certaines règlementations territoriales qui contraignent l'utilisation des HF. En plus, on nous a remonté que les transmetteurs ne fonctionnaient pas très bien. Nous sommes donc partis à la recherche d'alternatives viables pour la transmission de l'audio.

## Restructuration Réseau

Pour optimiser la structure réseau, nous avons décidé de centraliser les connexions sur une RPi centrale. Chaque TOTEM est connecté en WIFI sur le TOTEM. Nous avons donc essayer de rechercher comment transmettre le flux audio par WIFI sur chaque TOTEM.

## Pistes Transmission Audio

### Protocole RTP

Le protocole RTP (Real-Time Transport) est un protocole permettant de transmettre un flux audio/vidéo via un réseau. Il est utilisé pour la transmission de flux audio/vidéo sur Internet. Il est basé sur le protocole UDP (User Datagram Protocol). Même si il est fait pour de la transmission temps réel, il ne garantit pas la fiabilité de la transmission et n'assure pas un délai de livraison minimum. Il est donc conçu plutôt pour échanger des données sur une longue distance. La forte latence lors de son utilisation lors des tests (environ 500ms) nous a fait abandonner cette piste.

### NDI

Le NDI est une spécifiaction logicielle produite par Newtek permettant la diffusion en broadcast de flux vidéo et audio. Il est basé sur le protocole mDNS. Il est très utilisé pour la transmission temps réel, dans les stades ou les festivals, et est spécifiquement conçu pour avoir le moins de latence possible (10ms). Nous nous sommes donc tourné vers cette solution.

#### NDI/Pure Data

Nous avions trouvé un plugin permettant de recevoir un flux NDI dans Pure Data. (référence : <a href="https://github.com/gogo2/pd-ndi/releases"></a>) Cependant, le plugin a été mis à jour jusqu'à la version 4.1 de NDI (version actuelle : 5.0). Nous avons donc essayé de convertir le flux NDI avant de le faire passer dans PureData.

#### NDI/JACK

Nous avons essayé de convertir le flux NDI en flux JACK, puis de l'injecter dans Pure Data. Pour la conversion, nous avons trouvé l'outil NDItoJack (référence : <a href="https://github.com/windows10luke/NDI-to-JACK.git"></a>). Un problème de connectique entre le serveur Jack (QJackctl) et Pure Data nous a empêcher de valider cette solution, néanmoins, le flux NDI était bien converti en flux Jack. Nous avons réussi à faire sortir le son de la carte Raspberry sans passer par Pure Data, et il nous est apparu que la qualité audio n'était pas optimale. Cela peut être palier en utilisatn une interface son externe (carte son USB). 