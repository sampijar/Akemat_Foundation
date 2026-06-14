// =========================================================
// Akemat Foundation — SPA Logic Engine
// =========================================================

const app = {
  currentUser: null,
  
  // Data Dummy (Disimpan di memory/localStorage)
  nurses: [
    { id: 1, name: "Ns. Siti Aminah, S.Kep", type: "Perawatan Lansia", location: "Bogor, Jawa Barat", rate: 150000, exp: "5 Tahun" },
    { id: 2, name: "Br. Budi Santoso, Amd.Kep", type: "Perawatan Pasca Operasi", location: "Depok, Jawa Barat", rate: 200000, exp: "8 Tahun" },
    { id: 3, name: "Ns. Rina Melati, S.Kep", type: "Perawatan Ibu & Bayi", location: "Bogor, Jawa Barat", rate: 180000, exp: "3 Tahun" }
  ],
  
  campaigns: [
    { id: 1, title: "Bantu Pak Herman (Pasca Stroke) Pemulihan", target: 15000000, collected: 8500000, author: "Keluarga Herman" },
    { id: 2, title: "Subsidi Kursi Roda untuk Lansia Dhuafa", target: 5000000, collected: 1200000, author: "Akemat Peduli" }
  ],

  init() {
    // Cek apakah ada data tersimpan
    const savedUser = localStorage.getItem('akemat_user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
    const savedCamps = localStorage.getItem('akemat_campaigns');
    if (savedCamps) {
      this.campaigns = JSON.parse(savedCamps);
    }

    this.bindEvents();
    this.updateNav();
    this.navigate('home');
  },

  bindEvents() {
    document.getElementById('authForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('authName').value;
      const role = document.getElementById('authRole').value;
      this.login(name, role);
    });

    document.getElementById('createCampaignForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('campTitle').value;
      const target = Number(document.getElementById('campTarget').value);
      this.createCampaign(title, target);
    });
  },

  // --- ROUTING SYSTEM ---
  navigate(viewId) {
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.querySelector(`[data-view="${viewId}"]`).classList.add('active');
    
    if (viewId === 'nurses') this.renderNurses();
    if (viewId === 'campaigns') this.renderCampaigns();
  },

  routeDashboard() {
    if (!this.currentUser) return this.navigate('auth');
    
    // Setel nama pengguna di semua span nama
    document.querySelectorAll('.user-name').forEach(el => el.textContent = this.currentUser.name);
    
    // Arahkan ke dashboard sesuai role
    this.navigate(`dashboard-${this.currentUser.role}`);
  },

  // --- AUTHENTICATION ---
  login(name, role) {
    this.currentUser = { name, role };
    localStorage.setItem('akemat_user', JSON.stringify(this.currentUser));
    this.updateNav();
    this.routeDashboard();
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem('akemat_user');
    this.updateNav();
    this.navigate('home');
  },

  updateNav() {
    const authLink = document.getElementById('nav-auth');
    const dashLink = document.getElementById('nav-dashboard');
    if (this.currentUser) {
      authLink.style.display = 'none';
      dashLink.style.display = 'inline-block';
    } else {
      authLink.style.display = 'inline-block';
      dashLink.style.display = 'none';
    }
  },

  // --- RENDERERS ---
  formatRp(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  },

  renderNurses() {
    const container = document.getElementById('nurseList');
    container.innerHTML = this.nurses.map(nurse => `
      <div class="doc-card">
        <div class="doc-header">
          <div class="doc-avatar">${nurse.name.charAt(0)}</div>
          <div class="doc-info">
            <h3>${nurse.name}</h3>
            <span>${nurse.type} • Pengalaman ${nurse.exp}</span>
            <span>📍 ${nurse.location}</span>
          </div>
        </div>
        <div class="doc-rate">${this.formatRp(nurse.rate)} / kunjungan</div>
        <button class="btn btn-outline btn-sm" onclick="alert('Fitur pemesanan akan diarahkan ke WhatsApp Perawat')">Pesan Sekarang</button>
      </div>
    `).join('');
  },

  renderCampaigns() {
    const container = document.getElementById('campaignList');
    container.innerHTML = this.campaigns.map(camp => {
      const percentage = Math.min((camp.collected / camp.target) * 100, 100);
      return `
        <div class="camp-card">
          <div class="camp-img">Foto Kampanye</div>
          <div class="camp-body">
            <h3>${camp.title}</h3>
            <span style="font-size:0.85rem; color:var(--color-ink-soft)">Oleh: ${camp.author}</span>
            <div class="progress-bg">
              <div class="progress-bar" style="width: ${percentage}%"></div>
            </div>
            <div class="camp-stats">
              <span>Terkumpul: ${this.formatRp(camp.collected)}</span>
            </div>
            <button class="btn btn-accent btn-sm" style="margin-top:10px" onclick="alert('Fitur pembayaran donasi sedang dikembangkan')">Donasi Sekarang</button>
          </div>
        </div>
      `;
    }).join('');
  },

  // --- CAMPAIGNER ACTIONS ---
  createCampaign(title, target) {
    const newCamp = {
      id: Date.now(),
      title,
      target,
      collected: 0,
      author: this.currentUser.name
    };
    this.campaigns.unshift(newCamp);
    localStorage.setItem('akemat_campaigns', JSON.stringify(this.campaigns));
    
    document.getElementById('createCampaignForm').reset();
    alert('Kampanye berhasil diterbitkan!');
    this.navigate('campaigns'); // Bawa user lihat hasil karyanya
  }
};

// Jalankan aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => app.init());
