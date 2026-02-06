const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const pool = require('./db.cjs');

const authRoutes = require('./routes/auth.cjs');
const channelRoutes = require('./routes/channels.cjs');
const inquiryRoutes = require('./routes/inquiries.cjs');
const documentRoutes = require('./routes/documents.cjs');
const newsRoutes = require('./routes/news.cjs');
const ogRoutes = require('./routes/og.cjs');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/og', ogRoutes);

async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS channels (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        logo_url TEXT,
        hashtags TEXT,
        subscribers VARCHAR(100),
        age_demographics TEXT,
        gender_ratio VARCHAR(100),
        description TEXT,
        reference_url TEXT,
        reference_url_2 TEXT,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        content TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        document_type VARCHAR(50) NOT NULL,
        description TEXT,
        file_url TEXT NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    const bcrypt = require('bcryptjs');
    const adminExists = await pool.query('SELECT id FROM admins WHERE username = $1', ['admin']);
    if (adminExists.rows.length === 0) {
      const passwordHash = await bcrypt.hash('tippingpoint2026', 10);
      await pool.query(
        'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
        ['admin', passwordHash]
      );
      console.log('Default admin created: username=admin, password=tippingpoint2026');
    }

    console.log('Database initialized successfully');

    const channelCount = await pool.query('SELECT COUNT(*) FROM channels');
    if (parseInt(channelCount.rows[0].count) === 0) {
      console.log('No channels found. Seeding default channel data...');
      const seedChannels = [
        ['서진대학', 'fandom', '/uploads/logos/1770098623917-794298195.png', '#박서진 #닻별 #현역가왕 #살림남', '15.5만', '50-70대 90%', '여성 71% / 남성 29%', '트로트 인기 가수 박서진 팬덤 채널, 박서진은 MBN 현역가왕2 우승, KBS2 살림남 고정 출연과 함께 중장년층 여성들에게 전국민적인 인기를 보여주고 있는 톱스타.', 'https://youtube.com/shorts/UZlqUQZakLM', 'https://youtube.com/shorts/C-1i2uT2PQs?feature=share', 1],
        ['용빈대학', 'fandom', '/uploads/logos/1770099621260-927574458.png', '#김용빈 #금수저 #사랑빈 #미스터트롯3', '15.4만', '50-70대 95%', '여성 85% / 남성 15%', '용빈대학은 김용빈의 팬덤 채널입니다. \'미스터트롯3\' 우승 후 2026년 브랜드평판 최상위권을 지키며, 압도적인 외모와 실력, 인성을 갖춘 \'트롯 황태자\'로서 압도적인 인기와 위상을 떨치고 있습니다.', 'https://youtube.com/shorts/Q-UAEj0ux6k?feature=share', 'https://youtube.com/shorts/vJJvufUdiSM?feature=share', 2],
        ['영웅대학', 'fandom', '/uploads/logos/1770099866187-751559471.png', '#임영웅 #영웅시대 #국민가수 #건행', '9.2만', '50-70대 95%', '여성 85% / 남성 15%', '국민가수급 평판의 임영웅의 팬덤 채널, 임영웅은 미스터트롯 우승자로 아이돌을 능가하는 영향력과 인기로 공연, 광고, 예능 출연만으로도 큰 화제가 되고 있습니다.', 'https://youtube.com/shorts/05p_f7dO2eA?feature=share', 'https://youtube.com/shorts/xk9ECuOR4BQ?feature=share', 3],
        ['지현대학', 'fandom', '/uploads/logos/1770176572373-744996032.png', '#박지현 #엔돌핀 #미스터트롯2 #나혼자산다', '6.7만', '50-70대 88%', '여성 55.4% / 남성 44.6%', '\'미스터트롯2\' 선 출신 박지현은 2025년 MBC 인기상을 수상한 최고 대세입니다. 2026년 2월 정규 앨범 발매와 MBN MC 발탁으로 가요와 예능을 평정한 \'트롯 황태자\' 로서 독보적 위상을 떨치고 있습니다.', 'https://youtube.com/shorts/TIRP4pliS8w?feature=share', 'https://youtube.com/shorts/yi1xdsYjdTI?feature=share', 4],
        ['찬원대학', 'fandom', '/uploads/logos/1770178567181-714125538.png', '#이찬원 #찬스 #찬또배기 #연예대상', '5.9만', '50-70대 88%', '여성 78% / 남성 22%', '\'찬또배기\' 이찬원은 2026년 1월 브랜드평판 2위를 차지한 명실상부한 트롯 대세입니다. 2024년 KBS 연예대상 수상과 정규 2집 초동 61만 장 돌파로 가창력과 예능감을 겸비한 \'만능 엔터테이너\'로서 독보적인 위상을 떨치고 있습니다.', 'https://youtube.com/shorts/5EV5RueY5-Y?feature=share', 'https://youtube.com/shorts/JdKEgkCdM2E?feature=share', 5],
        ['트롯매거진', 'general', '/uploads/logos/1770100156835-20575423.png', '#트롯매거진 #트로트여자가수 #전유진 #송가인 #김다현', '18.2만', '50-70대 93.8%', '여성 45.3% / 남성 54.7%', '트롯매거진은 인기 트로트 여자 가수들의 이슈를 빠르게 전달하고 있습니다. 현역가왕 초대 가왕 전유진과 준우승 김다현, 미스트롯1 초대 우승자 송가인을 비롯해 홍지윤, 박신혜 등 트로트 여자가수들의 소식을 전반적으로 다루고 있습니다.', 'https://youtube.com/shorts/A5xiTko_Gnc?feature=share', 'https://youtube.com/shorts/g48WdM2PvDo?feature=share', 1],
        ['트롯연구소', 'general', '/uploads/logos/1770178983126-530979427.png', '#영탁 #장민호 #정동원 #김희재 #손태진', '6.4만', '50-70대 93%', '여성 85% / 남성 15%', '영탁, 장민호, 정동원, 김희재, 손태진 등의 인기 남자 트로트 가수들의 최신 소식을 신속히 전합니다. 아티스트의 다채로운 매력과 비하인드를 공유하며 팬들과 뜨겁게 소통하는 채널입니다.', 'https://youtube.com/shorts/B7DjZZjwNTc?feature=share', 'https://youtube.com/shorts/ykCalL0JsjY?feature=share', 2],
        ['트롯사랑', 'general', '/uploads/logos/1770179251343-518563475.png', '#손빈아 #진해성 #강문경 #트로트남자가수', '6.3만명', '50-70대 95%', '여성 84% / 남성 16%', '손빈아, 진해성, 강문경 등 최근 큰 인기를 얻고 있는 트로트 남자 가수들의 최신 이슈를 공유하며 팬들과 활발하게 소통하는 채널입니다.', 'https://youtube.com/shorts/EsulZDDFMHg?feature=share', 'https://youtube.com/shorts/kToLiBNocSw?feature=share', 3],
        ['트롯뉴스', 'general', '/uploads/logos/1770179497919-4500509.png', '#현역가왕3 #미스트롯4 #MBN #TV조선', '3.3만', '50-70대 96%', '여성 60% / 남성 40%', '2026년 방영중인 TV조선 미스트롯4, MBN 현역가왕3의 방송을 리뷰하고 트로트 경연에서 인기를 얻고 있는 출연자들의 스토리와 이슈를 다루며 팬덤 채널로 확장하고 있는 채널입니다.', 'https://youtube.com/shorts/Icwm6r1BTxc?feature=share', 'https://youtube.com/shorts/EKp3h_XuSec?feature=share', 4],
        ['트롯매거진', 'press', '/uploads/logos/1770175911563-259379368.png', '#트로트튜스 #트로트소식 #트로트전문 #트로트가수', '50만', '50-70대 95%', '여성 80% / 남성 20%', '트롯매거진은 대한민국을 대표하는 국내 최초 트로트 전문 미디어로 트로트 가수·트로트 방송·트로트 이슈를 가장 신속하고 깊이 있게 전달하는 대한민국 No.1 트로트 뉴스 플랫폼입니다. 우리는 국내 최대 규모의 트로트 전문 콘텐츠를 생산·유통하며, 트로트 산업 발전과 대중문화 확산에 앞장서고 있습니다.', '', '', 1],
        ['트롯매거진 -네이버 블로그', 'blog', '/uploads/logos/1770180193888-624664200.png', '#네이버 #블로그 #트로트종합 #트로트이슈', '4천~7천명', '50-70대 80%', '여성 73.4% / 남성 26.6%', '대한민국 최초 트로트 전문 미디어 트롯매거진의 공식 네이버 블로그로, 최애 트로트 가수의 소식을 가장 빠르게 만날 수 있는 곳입니다. SEO 최적화를 통해 네이버 홈에 노출되며, 검색 결과 최상위에 노출되고 있습니다.', 'https://blog.naver.com/trot-magazine/224121754816', 'https://blog.naver.com/trot-magazine/224153624357', 0],
      ];
      for (const ch of seedChannels) {
        await pool.query(
          'INSERT INTO channels (name, category, logo_url, hashtags, subscribers, age_demographics, gender_ratio, description, reference_url, reference_url_2, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
          ch
        );
      }
      console.log('Default channels seeded successfully');
    } else {
      const missingRef2 = await pool.query('SELECT COUNT(*) FROM channels WHERE reference_url_2 IS NULL AND category != \'press\'');
      if (parseInt(missingRef2.rows[0].count) > 0) {
        console.log('Updating missing reference_url_2 data...');
        const ref2Updates = [
          ['서진대학', 'https://youtube.com/shorts/C-1i2uT2PQs?feature=share'],
          ['용빈대학', 'https://youtube.com/shorts/vJJvufUdiSM?feature=share'],
          ['영웅대학', 'https://youtube.com/shorts/xk9ECuOR4BQ?feature=share'],
          ['지현대학', 'https://youtube.com/shorts/yi1xdsYjdTI?feature=share'],
          ['찬원대학', 'https://youtube.com/shorts/JdKEgkCdM2E?feature=share'],
          ['트롯매거진', 'https://youtube.com/shorts/g48WdM2PvDo?feature=share'],
          ['트롯연구소', 'https://youtube.com/shorts/ykCalL0JsjY?feature=share'],
          ['트롯사랑', 'https://youtube.com/shorts/kToLiBNocSw?feature=share'],
          ['트롯뉴스', 'https://youtube.com/shorts/EKp3h_XuSec?feature=share'],
          ['트롯매거진 -네이버 블로그', 'https://blog.naver.com/trot-magazine/224153624357'],
        ];
        for (const [name, url] of ref2Updates) {
          await pool.query('UPDATE channels SET reference_url_2 = $1 WHERE name = $2 AND reference_url_2 IS NULL', [url, name]);
        }
        console.log('Reference URL 2 data updated successfully');
      }
    }

  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Catch-all route for client-side routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});
