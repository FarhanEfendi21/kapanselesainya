import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./config/supabase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Agar bisa diakses dari Frontend manapun (termasuk Vercel Frontend)
app.use(cors());
app.use(express.json());

// === ROUTE TEST (Untuk Cek Server Jalan) ===
app.get('/', (req, res) => {
    res.send('Server TrueKicks dengan Supabase Berjalan di Vercel! 🚀');
});

// === 1. ROUTE PRODUCTS (Semua Sepatu dari tabel 'products') ===
app.get('/api/products', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: true });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 2. ROUTE SNEAKERS (Khusus tabel 'sneakers') ===
app.get('/api/sneakers', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sneakers')
            .select('*')
            .order('id', { ascending: true });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 3. ROUTE APPAREL (Khusus tabel 'apparel') ===
app.get('/api/apparel', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('apparel')
            .select('*')
            .order('id', { ascending: true });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 4. ROUTE CATEGORIES (Untuk Navbar & Filter) ===
app.get('/api/categories', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('categories') 
            .select('*');
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 5. ROUTE REGISTER (Daftar User Baru) ===
app.post('/api/register', async (req, res) => {
    const { full_name, email, password } = req.body;

    try {
        const { data: existingUser } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar!" });
        }

        const { data, error } = await supabase
            .from('users')
            .insert([{ full_name, email, password }]) 
            .select();

        if (error) throw error;

        res.status(201).json({ message: "Registrasi berhasil!", user: data[0] });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// === 6. ROUTE LOGIN (Masuk) ===
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password) 
            .single();

        if (error || !user) {
            return res.status(401).json({ message: "Email atau Password salah!" });
        }

        res.json({ message: "Login berhasil!", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// === 7. ROUTE DETAIL PRODUK (DINAMIS) ===
app.get('/api/detail/:table/:id', async (req, res) => {
    const { table, id } = req.params;
    const allowedTables = ['products', 'sneakers', 'apparel'];
    if (!allowedTables.includes(table)) return res.status(400).json({ message: "Tabel tidak valid" });

    try {
        const { data, error } = await supabase
            .from(table)
            .select('*') 
            .eq('id', id)
            .single();
        
        if (error) throw error;
        if (!data) return res.status(404).json({ message: "Produk tidak ditemukan" });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 8. ROUTE ORDER / CHECKOUT ===
app.post('/api/orders', async (req, res) => {
    const { user_id, full_name, address, phone, total_price, items } = req.body; 

    try {
        const parsed_user_id = parseInt(user_id);
        const parsed_total_price = parseFloat(total_price);
        
        if (isNaN(parsed_user_id) || !full_name || !address || !items || items.length === 0) {
            return res.status(400).json({ error: "Missing required order data." });
        }
        
        const orderPayload = {
            user_id: parsed_user_id,
            full_name: full_name,
            address: address, 
            phone: phone,
            total_price: parsed_total_price,
            items: items, 
            status: 'Processing',
        };
        
        const { data, error } = await supabase
            .from('orders')
            .insert(orderPayload)
            .select();

        if (error) throw error;

        res.status(201).json({ message: "Order berhasil dibuat!", order: data });

    } catch (error) {
        console.error("Error Detail:", error.message); 
        res.status(500).json({ error: "DB Insert Failed: " + error.message });
    }
});

// === PENTING UNTUK VERCEL ===
// 1. Export 'app' sebagai default export (karena pakai ES Modules)
export default app;

// 2. Hanya jalankan app.listen jika TIDAK di environment Production (Vercel)
//    Ini agar codingan tetap jalan saat kamu tes di laptop (localhost)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server TrueKicks berjalan di http://localhost:${PORT}`);
    });
}