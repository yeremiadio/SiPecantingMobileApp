import {Question} from '@/types/selfAssessment';

const cocurrencyOptions = [
  {label: 'Sangat sering', value: 5},
  {label: 'Sering', value: 4},
  {label: 'Kadang-kadang', value: 3},
  {label: 'Jarang', value: 2},
];
const approvalOptions = [
  {label: 'Sangat setuju', value: 5},
  {label: 'Setuju', value: 4},
  {label: 'Netral', value: 3},
  {label: 'Tidak setuju', value: 2},
  {label: 'Sangat tidak setuju', value: 1},
];

export const questionDummies: Question[] = [
  {
    id: 1,
    questionText:
      'Seberapa sering anak Anda mengalami sakit atau infeksi dalam 6 bulan terakhir?',
    options: cocurrencyOptions,
  },
  {
    id: 2,
    questionText:
      'Saya merasa anak saya mengalami penurunan berat badan dalam 6 bulan terakhir.',
    options: approvalOptions,
  },
  {
    id: 3,
    questionText:
      'Saya merasa pertumbuhan tinggi badan anak saya lebih lambat dibandingkan anak-anak seusianya.',
    options: approvalOptions,
  },
  {
    id: 4,
    questionText: 'Anak saya memiliki nafsu makan yang baik dan cukup.',
    options: approvalOptions,
  },
  {
    id: 5,
    questionText:
      'Anak saya tampak lemas dan kurang bersemangat dalam beraktivitas sehari-hari.',
    options: approvalOptions,
  },
  {
    id: 6,
    questionText:
      'Anak saya menunjukkan perkembangan motorik yang sesuai dengan usianya (misalnya, merangkak, berjalan).',
    options: approvalOptions,
  },
  {
    id: 7,
    questionText:
      'Anak saya memiliki kemampuan kognitif yang sesuai dengan usianya (misalnya, berbicara, mengenali warna).',
    options: approvalOptions,
  },
  {
    id: 8,
    questionText:
      'Anak saya terlihat lebih pendek dibandingkan anak-anak seusianya.',
    options: approvalOptions,
  },
  {
    id: 9,
    questionText: 'Rambut anak saya tampak tipis, kering, dan mudah rontok.',
    options: approvalOptions,
  },
  {
    id: 10,
    questionText: 'Kulit anak saya terlihat kering dan bersisik.',
    options: approvalOptions,
  },
  {
    id: 11,
    questionText:
      'Anak saya mengalami perubahan pola tidur (misalnya, tidur lebih lama atau kesulitan tidur).',
    options: approvalOptions,
  },
  {
    id: 12,
    questionText:
      'Anak saya sering mengalami kesulitan saat makan (misalnya, sering muntah atau menolak makan).',
    options: approvalOptions,
  },
  {
    id: 13,
    questionText:
      'Anak saya memiliki masalah dengan kesehatan gigi dan mulut (misalnya, gigi keropos atau sariawan).',
    options: approvalOptions,
  },
  {
    id: 14,
    questionText:
      'Anak saya sering tidak masuk sekolah atau taman kanak-kanak karena sakit.',
    options: approvalOptions,
  },
  {
    id: 15,
    questionText:
      'Anak saya memiliki kesulitan dalam berinteraksi dengan anak-anak lain seusianya.',
    options: approvalOptions,
  },
  // Add the rest of the questions in the same format
];
