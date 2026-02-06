-- Seed users (passwords are hashed with bcrypt, these are examples)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, phone, location, verified, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'client@nordlionauto.com', '$2a$10$xQXwXxXxXxXxXxXxXxXxXx', 'John', 'Client', 'client', '+44 20 1234 5678', 'London, UK', TRUE, 'active'),
('550e8400-e29b-41d4-a716-446655440002', 'broker@nordlionauto.com', '$2a$10$xQXwXxXxXxXxXxXxXxXxXx', 'Sarah', 'Broker', 'broker', '+44 20 2345 6789', 'London, UK', TRUE, 'active'),
('550e8400-e29b-41d4-a716-446655440003', 'admin@nordlionauto.com', '$2a$10$xQXwXxXxXxXxXxXxXxXxXx', 'Admin', 'User', 'admin', '+44 20 3456 7890', 'London, UK', TRUE, 'active');

-- Seed vehicles
INSERT INTO vehicles (id, make, model, year, price, status, mileage, location, vin, description, features, added_by) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Porsche', '911 GT3 RS', 2024, 289000.00, 'available', 1200, 'London, UK', '12345678901234567', 'Pristine condition Porsche GT3 RS with full service history', '{"engine": "4.0L Flat-6", "power": "518 hp", "transmission": "7-speed PDK"}', '550e8400-e29b-41d4-a716-446655440002'),
('660e8400-e29b-41d4-a716-446655440002', 'Ferrari', 'SF90 Stradale', 2023, 625000.00, 'reserved', 850, 'Monaco', '23456789012345678', 'Hybrid supercar in exceptional condition', '{"engine": "4.0L V8 + Electric", "power": "986 hp", "transmission": "8-speed DCT"}', '550e8400-e29b-41d4-a716-446655440002'),
('660e8400-e29b-41d4-a716-446655440003', 'Lamborghini', 'Huracán STO', 2023, 345000.00, 'sold', 500, 'Dubai, UAE', '34567890123456789', 'Track-focused Lamborghini with carbon fiber package', '{"engine": "5.2L V10", "power": "640 hp", "transmission": "7-speed DCT"}', '550e8400-e29b-41d4-a716-446655440002'),
('660e8400-e29b-41d4-a716-446655440004', 'McLaren', '720S Spider', 2024, 385000.00, 'available', 300, 'Los Angeles, USA', '45678901234567890', 'Stunning McLaren 720S Spider with retractable hardtop', '{"engine": "4.0L Twin-Turbo V8", "power": "710 hp", "transmission": "7-speed SSG"}', '550e8400-e29b-41d4-a716-446655440002');

-- Seed orders
INSERT INTO orders (id, order_number, user_id, vehicle_id, broker_id, price, status, payment_status, tracking_number, estimated_delivery) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'ORD-2026-001', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 289000.00, 'in-transit', 'paid', 'TRK-UK-2026-89347', '2026-02-15'),
('770e8400-e29b-41d4-a716-446655440002', 'ORD-2026-002', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 625000.00, 'processing', 'pending', NULL, '2026-03-10');

-- Seed conversations
INSERT INTO conversations (id, participant_1, participant_2, last_message_at) VALUES
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', NOW());

-- Seed messages
INSERT INTO messages (conversation_id, sender_id, receiver_id, content, read) VALUES
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Hello! How can I assist you with your vehicle order today?', TRUE),
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Hi! I wanted to check on the delivery status of my Porsche 911 GT3 RS.', TRUE),
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Of course! Your Porsche 911 GT3 RS is currently in transit and expected to arrive on February 15th.', TRUE);

-- Seed wishlist
INSERT INTO wishlist (user_id, vehicle_id, notes) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440004', 'Interested in this McLaren for summer');
