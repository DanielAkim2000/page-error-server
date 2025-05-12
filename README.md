# Pages d'Erreur Animées pour Nginx

Ce répertoire contient des pages d'erreur animées et interactives pour Nginx. Elles sont conçues pour remplacer les pages d'erreur par défaut lorsque vos conteneurs ou services sont indisponibles.

## Contenu

- **500.html** - Erreur interne du serveur
- **502.html** - Mauvaise passerelle
- **503.html** - Service indisponible
- **504.html** - Délai d'attente de la passerelle

## Fonctionnalités

- Animations CSS fluides et interactives
- Design responsive (s'adapte à tous les appareils)
- Animations JavaScript pour plus d'interactivité
- Compatible avec tous les navigateurs modernes

## Installation

1. Clonez ce répertoire dans votre serveur Nginx (ou copiez les fichiers)
2. Placez les fichiers dans un répertoire accessible, par exemple `/usr/share/nginx/html/error-pages/`

## Configuration Nginx

### Option 1: Configuration au niveau du serveur

Pour configurer ces pages d'erreur au niveau du serveur, ajoutez les lignes suivantes à votre configuration Nginx dans le bloc `server` :

```nginx
# Configuration des pages d'erreur
error_page 500 /error-pages/500.html;
error_page 502 /error-pages/502.html;
error_page 503 /error-pages/503.html;
error_page 504 /error-pages/504.html;

# Emplacement des pages d'erreur
location ^~ /error-pages/ {
    internal;
    root /usr/share/nginx/html;
    # Ne pas permettre l'accès direct aux pages d'erreur
}
```

### Option 2: Configuration comme proxy inverse

Si vous utilisez Nginx comme proxy inverse pour vos conteneurs, vous pouvez configurer les pages d'erreur dans le bloc `location` :

```nginx
server {
    listen 80;
    server_name example.com;

    # Configuration des pages d'erreur
    error_page 500 /error-pages/500.html;
    error_page 502 /error-pages/502.html;
    error_page 503 /error-pages/503.html;
    error_page 504 /error-pages/504.html;

    location ^~ /error-pages/ {
        internal;
        root /usr/share/nginx/html;
    }

    location / {
        proxy_pass http://your-container-service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 5s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;
    }
}
```

### Option 3: Configuration pour plusieurs conteneurs

Si vous avez plusieurs conteneurs derrière Nginx, vous pouvez configurer les pages d'erreur de manière globale :

```nginx
# Configuration globale pour les erreurs
error_page 500 /error-pages/500.html;
error_page 502 /error-pages/502.html;
error_page 503 /error-pages/503.html;
error_page 504 /error-pages/504.html;

# Serveur 1
server {
    listen 80;
    server_name app1.example.com;

    location ^~ /error-pages/ {
        internal;
        root /usr/share/nginx/html;
    }

    location / {
        proxy_pass http://container1;
        # autres configurations de proxy
    }
}

# Serveur 2
server {
    listen 80;
    server_name app2.example.com;

    location ^~ /error-pages/ {
        internal;
        root /usr/share/nginx/html;
    }

    location / {
        proxy_pass http://container2;
        # autres configurations de proxy
    }
}
```

## Personnalisation

Vous pouvez personnaliser les pages d'erreur en modifiant les fichiers HTML, CSS ou JavaScript :

- Modifiez `css/style.css` pour changer le style et les animations
- Modifiez `js/error.js` pour changer les interactions JavaScript
- Modifiez les fichiers HTML pour changer le contenu des pages

## Licence

Ces pages d'erreur sont libres d'utilisation, de modification et de distribution.

---

Créé avec ❤️ pour améliorer l'expérience utilisateur même en cas d'erreur.
