package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fs := http.FileServer(http.Dir("public"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL.Path)
		if r.URL.Path == "/" {
			http.ServeFile(w, r, "public/index.html")
			return
		}

		// Check if file exists in public directory
		path := filepath.Join("public", r.URL.Path)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			if _, err := os.Stat("public/404.html"); err == nil {
				w.WriteHeader(http.StatusNotFound)
				http.ServeFile(w, r, "public/404.html")
				return
			}
			http.NotFound(w, r)
			return
		}

		fs.ServeHTTP(w, r)
	})

	addr := ":" + port
	fmt.Printf("Server starting on http://localhost%s\n", addr)
	fmt.Printf("Serving files from: %s\n", mustGetwd())
	fmt.Println("Press Ctrl+C to stop")

	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal(err)
	}
}

func mustGetwd() string {
	dir, err := os.Getwd()
	if err != nil {
		return "."
	}
	return dir
}
