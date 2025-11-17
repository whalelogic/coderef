# CodeRef - Programming Language Reference

A clean, interactive code reference website for multiple programming languages.

## Features

- 📚 Reference guides for Go, Python, and JavaScript
- 🎨 Clean, responsive design using Bulma CSS
- 🔍 Search functionality for filtering topics
- 📱 Mobile-friendly interface
- ⚡ Fast static file serving with Go


## Clean and Extensible UI
<img alt="image" src="https://github.com/user-attachments/assets/010ab6b5-e5fb-4f4e-a5ba-9a3ce274e054" />



## Running the Server

### Using Go (Recommended)

```bash
# Run directly
go run main.go

# Or build and run
go build -o coderef
./coderef
```

The server will start on `http://localhost:8080` by default.

To use a different port:
```bash
PORT=3000 go run main.go
```

### Using Python (Alternative)

```bash
python3 -m http.server 8000
```

## Project Structure

```
.
├── index.html              # Main entry point
├── main.go                 # Go static file server
├── go.mod                  # Go module file
├── public/
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   ├── 404.html            # Custom 404 page
│   ├── references/         # Language reference files
│   │   ├── go/
│   │   ├── python/
│   │   └── javascript/
│   └── static/
│       ├── css/
│       │   └── style.css   # Custom styles
│       └── js/
│           └── app.js      # Dynamic content loading
└── README.md
```

## Technologies

- **Frontend**: HTML, CSS (Bulma), JavaScript
- **Backend**: Go (static file server)
- **Fonts**: Google Fonts (Roboto, Lato)
- **Syntax Highlighting**: Prism.js
- **Icons**: Devicon, Font Awesome and Icons8
- **Search**: Simple JavaScript filtering
- **Deployment**: Static hosting compatible


## Branding

The CodeRef logo is an anchor icon, representing stability and a deep-rooted foundation in knowledge. The icon is sourced from [Icons8](https://icons8.com).

## License

MIT License
