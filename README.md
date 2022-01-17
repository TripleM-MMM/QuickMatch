# QuickMatch

> ### 1. [Jak uruchomić](https://github.com/TripleM-MMM/QuickMatch/blob/main/README.md#1-jak-uruchomi%C4%87-1)
> ### 2. [Uruchamianie testów](https://github.com/TripleM-MMM/QuickMatch/blob/main/README.md#2-uruchamianie-test%C3%B3w-1)
# 1. Jak uruchomić
Po skolonowaniu kodu repozytorium, należy wykonać poniższe kroki. Wszystkie komendy uruchamiamy z poziomy katalogu głównego na gałęzi **main**.
### Narzędzia potrzebne do uruchomienia:
* **Python** (najlepiej w wersji 3.9.7)
* **pip**
## 1.1. Instalacja niezbędnych pakietów
Instalacja pakietow django poleceniem:
```
pip install -r requirements.txt
```
Instalacja pakietów npm poleceniem:
```
npm install
```
## 1.2. Uruchomienie serwera
```
python manage.py runserver
```
Po wykonaniu tego polecenia zostanie uruchomiony serwer aplikacji pod adresem **http://localhost:8000/**
## 1.3. Uruchomienie aplikacji
```
npm start
```
Po wykonaniu tego polecenia zostanie uruchomiona aplikacja pod adresem **http://localhost:3000/**
# 2. [Serwer aplikacji](http://localhost:8000/)
W celu rozszerzenia testowania poprawności działania aplikacji po stronie serwera, możemy skorzystać ze stron:
* [**/api**](http://localhost:8000/api) - komunikacja na granicy warst backend/frontend
* [**/admin**](http://localhost:8000/admin) - panel administracyjny (dostęp ograniczony)
# 3. Aplikacja
Szczegóły w pliku dokumentacji użytkownika
# 4. Uruchamianie testów
```
python manage.py test
```
