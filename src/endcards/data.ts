export type Branch = {name: string; spot: string; days: string; closed?: string; hours: string};

export const BRANCHES: Branch[] = [
  {name: 'TAMPIN', spot: 'Sebelah Public Bank', days: 'Setiap hari', hours: '9.00 pagi – 8.00 malam'},
  {name: 'KUALA PILAH', spot: 'Sebelah kedai emas Nurjannah', days: 'Isnin – Sabtu', hours: '9.30 pagi – 6.00 petang'},
  {name: 'BAHAU', spot: 'Berdekatan pasaraya Bilion', days: 'Setiap hari', closed: 'RABU TUTUP', hours: '10.30 pagi – 7.00 malam'},
  {name: 'SENAWANG', spot: 'Dataran Senawang', days: 'Setiap hari', hours: '10.00 pagi – 9.00 malam'},
  {name: 'NILAI', spot: 'Tapak pasar malam Desa Cempaka', days: 'Setiap hari', hours: '10.00 pagi – 8.00 malam'},
  {name: 'GEMAS', spot: 'Sebelah pejabat pos', days: 'Setiap hari', hours: '9.30 pagi – 6.00 petang'},
  {name: 'ALOR GAJAH', spot: 'Bersebelahan Ayam Gepuk Pak Gembus', days: 'Setiap hari', hours: '10.00 pagi – 8.30 malam'},
  {name: 'SEMENYIH', spot: 'Taman Pelangi Semenyih', days: 'Setiap hari', hours: '10.00 pagi – 8.00 malam'},
  {name: 'SEREMBAN 2', spot: 'Ikon Seremban 2, sebaris Eco Shop & DIY', days: 'Setiap hari', hours: '10.00 pagi – 9.00 malam'},
];

export const LENS_COLOURS = [
  {img: 'img/lens1.png', name: 'Silver Grey'},
  {img: 'img/lens2.png', name: 'Bronze Brown'},
  {img: 'img/lens3.png', name: 'Emerald Green'},
  {img: 'img/lens4.png', name: 'Oceanic Blue'},
];

export const PANELS = ['img/pmcare.png', 'img/mednefits.png', 'img/maim.png'];
export const PAYMENTS = ['img/spaylater.png', 'img/maybank.png', 'img/publicbank.png'];
