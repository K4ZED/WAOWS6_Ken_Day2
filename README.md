# WAOW Season 6 - Day 2: AI Powered Web App

Aplikasi web berbasis Flask yang mengintegrasikan Machine Learning untuk prediksi harga rumah (Regression) dan segmentasi pelanggan (Clustering) dengan antarmuka web modern.

## Fitur Utama

- **House Price Prediction**: Prediksi harga rumah menggunakan model regresi linear
- **Customer Clustering**: Segmentasi pelanggan menggunakan algoritma K-Means
- **Modern Web UI**: Antarmuka yang responsif dengan Bootstrap dan custom CSS/JS
- **RESTful API**: Endpoint API untuk integrasi dengan aplikasi lain
- **Interactive Visualization**: Visualisasi hasil clustering dengan scatter plot

## Stack Teknologi

- **Backend**: Python Flask
- **Machine Learning**: scikit-learn, pandas, numpy
- **Visualization**: matplotlib, seaborn
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5

## Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:

- Python 3.8 atau lebih tinggi
- pip (pengelola paket Python)

## Instalasi

1. **Clone repositori**
   ```bash
   git clone https://github.com/K4ZED/WAOWS6_Ken_Day2.git
   cd WAOWS6_KEN_DAY2
   ```

2. **Buat virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Di Windows: venv\Scripts\activate
   ```

3. **Install dependensi**
   ```bash
   pip install -r requirements.txt
   ```

## Menjalankan Aplikasi

1. **Jalankan server development Flask**
   ```bash
   python app.py
   ```

2. **Akses aplikasi**
   
   Buka browser Anda dan navigasi ke:
   ```
   http://127.0.0.1:5000
   ```

## Struktur Proyek

```
project-folder/
│
├── venv/                          # Virtual environment
│
├── ML/                            # Notebook Jupyter untuk training model
│   ├── WAOWS6_Ken_Day2_K_Means.ipynb
│   └── WAOWS6_Ken_Day2_Regression.ipynb
│
├── models/                       # Model ML yang telah di-training
│   ├── cluster_model.pkl         # Model K-Means
│   ├── regression_model.pkl      # Model regresi
│   └── scaler_cluster.pkl        # Scaler untuk clustering
│
├── routes/                       # Route handlers Flask
│   ├── __pycache__/
│   ├── clustering.py             # Route untuk clustering
│   └── predict.py                # Route untuk prediction
│
├── static/                       # File statis
│   ├── css/
│   │   └── style.css             # Stylesheet utama
│   ├── img/
│   │   └── cluster_visualization.png  # Hasil visualisasi clustering
│   └── js/
│       ├── cluster.js            # JavaScript untuk halaman clustering
│       └── predict.js            # JavaScript untuk halaman prediction
│
├── templates/                    # Template HTML
│   ├── base.html                 # Template dasar
│   ├── cluster.html              # Halaman clustering
│   ├── index.html                # Landing page
│   └── predict.html              # Halaman prediction
│
├── app.py                        # File aplikasi utama
├── requirements.txt              # Dependensi Python
├── .gitignore                    # File Git ignore
└── README.md                     # File ini
```

## Fitur Detail

### 1. House Price Prediction (Regression)

Model regresi untuk memprediksi nilai median harga rumah berdasarkan California Housing Dataset:
- **MedInc**: Median income dalam block group
- **HouseAge**: Median house age
- **AveRooms**: Rata-rata jumlah ruangan per rumah
- **AveBedrms**: Rata-rata jumlah kamar tidur per rumah
- **Population**: Populasi dalam block group
- **AveOccup**: Rata-rata occupancy per rumah
- **Latitude**: Koordinat latitude
- **Longitude**: Koordinat longitude

**Fitur Khusus:**
- Price categorization (Budget-Friendly, Mid-Range, Premium)
- Visual gauge untuk range harga
- Investment tips berdasarkan kategori harga
- Sample data loading untuk quick testing

**Endpoint API:**
```
POST /api/predict/
Content-Type: application/json

{
  "MedInc": 6.8,
  "HouseAge": 27,
  "AveRooms": 9.33,
  "AveBedrms": 0.97,
  "Population": 2401,
  "AveOccup": 1.4,
  "Latitude": 34.0,
  "Longitude": -118.2
}

Response:
{
  "success": true,
  "data": 4.35
}
```
*Note: Nilai data dalam satuan $100,000 (mis: 4.35 = $435,000)*

### 2. Customer Clustering (K-Means)

Segmentasi pelanggan menggunakan K-Means clustering (4 clusters) berdasarkan:
- **Age**: Usia pelanggan
- **Annual Income**: Pendapatan tahunan (dalam $k)
- **Spending Score**: Skor pengeluaran (1-100)

**Cluster Labels:**
- **Cluster 0 - Careful Spenders**: Low-Medium income, Low-Medium spending
  - Conservative, value-conscious shoppers
  - Strategy: Loyalty discounts, value bundles
  
- **Cluster 1 - Target (VIP)**: High income, High spending
  - Premium shoppers, brand loyal
  - Strategy: VIP membership, exclusive perks
  
- **Cluster 2 - Sensible**: Low-Medium income, High spending
  - Enthusiastic shoppers, trend followers
  - Strategy: Flexible payments, mobile engagement
  
- **Cluster 3 - Potential**: High income, Low spending
  - Selective buyers, research-oriented
  - Strategy: Quality highlights, ROI demonstrations

**Fitur Khusus:**
- Customer profile & behavior analysis
- Marketing strategies recommendations
- Canvas-based comparison chart (User vs Cluster Average)
- Sample data untuk setiap cluster type

**Endpoint API:**
```
POST /api/cluster/
Content-Type: application/json

{
  "Age": 28,
  "AnnualIncome": 35,
  "SpendingScore": 75
}

Response:
{
  "success": true,
  "cluster": 2
}
```

### 3. Halaman Web

#### Landing Page (`/`)
- Pengenalan aplikasi
- Navigasi ke fitur Prediction dan Clustering
- Desain modern dengan animasi dan efek hover

#### Prediction Page (`/predict`)
- Form input dengan 8 fitur California Housing Dataset
- Real-time validation dengan visual feedback (green/red borders)
- Price categorization dengan color-coded badges
- Visual gauge menampilkan price range
- Investment tips berdasarkan kategori harga
- Quick-fill sample data button
- Animasi loading dan smooth scrolling ke hasil

#### Clustering Page (`/cluster`)
- Form input untuk Age, Annual Income, Spending Score
- Dropdown sample selector untuk quick testing (4 cluster types)
- Real-time validation dengan error messages
- Hasil clustering dengan color-coded cluster badges
- Customer profile analysis (Behavior, Preference, Demographic)
- Marketing strategies recommendations dengan icons
- Canvas comparison chart (User Input vs Cluster Average)
- Interpretasi detail karakteristik setiap cluster

## Model Machine Learning

### Regression Model
- **Algoritma**: Linear Regression / Random Forest (tergantung implementation)
- **Dataset**: California Housing Dataset (sklearn)
- **Features**: MedInc, HouseAge, AveRooms, AveBedrms, Population, AveOccup, Latitude, Longitude
- **Target**: Median house value (dalam $100k units)
- **Evaluasi**: R² score, MAE, RMSE
- **File Model**: `models/regression_model.pkl`

### Clustering Model
- **Algoritma**: K-Means (4 clusters)
- **Dataset**: Mall Customer Segmentation Data
- **Features**: Age, Annual Income (k$), Spending Score (1-100)
- **Preprocessing**: StandardScaler untuk normalisasi data
- **File Model**: `models/cluster_model.pkl` dan `models/scaler_cluster.pkl`
- **Cluster Labels**:
  - Cluster 0: Careful Spenders (Low-Med Income, Low-Med Spending)
  - Cluster 1: Target VIP (High Income, High Spending)
  - Cluster 2: Sensible (Low-Med Income, High Spending)
  - Cluster 3: Potential (High Income, Low Spending)

## API Documentation

### Base URL
```
http://127.0.0.1:5000
```

### Endpoints

#### 1. Halaman Web
- `GET /` - Landing page
- `GET /predict` - Halaman prediction
- `GET /cluster` - Halaman clustering

#### 2. API Prediction
- **URL**: `/api/predict/`
- **Method**: POST
- **Content-Type**: application/json
- **Body Parameters**:
  - `MedInc` (number, required): Median income in block group
  - `HouseAge` (number, required): Median house age in block group
  - `AveRooms` (number, required): Average number of rooms per household
  - `AveBedrms` (number, required): Average number of bedrooms per household
  - `Population` (number, required): Block group population
  - `AveOccup` (number, required): Average number of household members
  - `Latitude` (number, required): Block group latitude
  - `Longitude` (number, required): Block group longitude
- **Response**: JSON dengan success status dan data (predicted value dalam $100k units)
- **Example**:
  ```json
  // Request
  {
    "MedInc": 6.8,
    "HouseAge": 27,
    "AveRooms": 9.33,
    "AveBedrms": 0.97,
    "Population": 2401,
    "AveOccup": 1.4,
    "Latitude": 34.0,
    "Longitude": -118.2
  }
  
  // Response
  {
    "success": true,
    "data": 4.35
  }
  // Note: data 4.35 = $435,000
  ```

#### 3. API Clustering
- **URL**: `/api/cluster/`
- **Method**: POST
- **Content-Type**: application/json
- **Body Parameters**:
  - `Age` (number, required): Customer age
  - `AnnualIncome` (number, required): Annual income dalam k$ (e.g., 50 = $50k)
  - `SpendingScore` (number, required): Spending score (1-100)
- **Response**: JSON dengan success status dan cluster number (0-3)
- **Example**:
  ```json
  // Request
  {
    "Age": 28,
    "AnnualIncome": 35,
    "SpendingScore": 75
  }
  
  // Response
  {
    "success": true,
    "cluster": 2
  }
  ```

## Fitur Tambahan

-  **Responsive Design**: Layout yang menyesuaikan berbagai ukuran layar
-  **Loading Animations**: Feedback visual saat processing
-  **Error Handling**: Validasi input dan error messages yang informatif
-  **Data Visualization**: Canvas-based comparison charts dan gauge visualization
-  **Modern UI/UX**: Gradient backgrounds, card designs, hover effects
-  **Form Validation**: Real-time client-side validation dengan visual feedback
-  **Sample Data Loading**: Quick-fill form dengan data sample untuk testing
-  **Price Categorization**: Otomatis kategorisasi harga (Budget, Mid-Range, Premium)
-  **Cluster Profiling**: Detail profil customer dan marketing strategies per cluster
-  **Interactive Charts**: Perbandingan input user vs cluster average dalam canvas chart

## Penggunaan

1. **Untuk Prediksi Harga Rumah**:
   - Buka halaman `/predict`
   - Klik "Load Sample Input" untuk mengisi form dengan data contoh (opsional)
   - Atau isi manual semua 8 fields dengan data California Housing
   - Klik tombol "Predict Price"
   - Lihat hasil prediksi dengan:
     - Harga dalam USD dengan 2 desimal
     - Kategori harga (Budget-Friendly/Mid-Range/Premium)
     - Visual gauge menunjukkan price range
     - Investment tips berdasarkan kategori

2. **Untuk Clustering Pelanggan**:
   - Buka halaman `/cluster`
   - Pilih sample cluster dari dropdown untuk quick testing (opsional)
   - Atau masukkan Age, Annual Income, dan Spending Score secara manual
   - Klik tombol "Find My Cluster"
   - Lihat hasil clustering dengan:
     - Cluster assignment dan deskripsi
     - Customer profile (Behavior, Preference, Demographic)
     - Marketing strategies recommendations
     - Comparison chart (Input vs Cluster Average)

3. **Menggunakan API**:
   - Gunakan tools seperti Postman, curl, atau JavaScript fetch
   - Kirim POST request ke `/api/predict/` atau `/api/cluster/`
   - Pastikan Content-Type: application/json
   - Proses response JSON yang diterima

## Troubleshooting

### Model tidak ditemukan
```bash
# Pastikan file model ada di folder models/
ls models/
# Atau jalankan ulang notebook training untuk generate model
```

### Port sudah digunakan
```python
# Ubah port di app.py
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Ganti ke port lain
```

### Dependencies error
```bash
# Install ulang semua dependencies
pip install -r requirements.txt --upgrade
```

## Development

### Menambah Fitur Baru

1. **Buat route baru** di folder `routes/`
2. **Register route** di `app.py`
3. **Buat template HTML** di folder `templates/`
4. **Tambahkan JavaScript** di folder `static/js/`
5. **Update styling** di `static/css/style.css`

### Training Model Baru

1. Buka notebook di folder `ML/`
2. Modify dataset atau parameter model
3. Training model dan save dengan pickle
4. Simpan model di folder `models/`
5. Update route untuk load model baru

## Kontribusi

Proyek ini dibuat sebagai bagian dari Workshop WAOW Season 6 - Day 2.

**Developer**: Kenza Athallah Nandana Wijaya

**Email**: kenzaathallah.wijaya@gmail.com

## Referensi

- [Flask Documentation](https://flask.palletsprojects.com/)
- [scikit-learn Documentation](https://scikit-learn.org/)
- [Bootstrap Documentation](https://getbootstrap.com/)

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dalam Workshop WAOW Season 6.

---

**Catatan**: Pastikan untuk selalu menggunakan virtual environment saat development untuk menghindari konflik dependencies.