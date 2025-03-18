-- Insert Rarity Pull Rates
INSERT INTO rarity_distribution (rarity, probability) VALUES
('Common', 0.495),
('Rare', 0.35),
('Epic', 0.10),
('Legendary', 0.05),
('Mythical', 0.005);

-- Insert Monster Types
INSERT INTO monster_types (name) VALUES
('Dragon'),
('Undead'),
('Golem'),
('Phantom'),
('Beast'),
('Mythical');

-- Sample Type Effectiveness Data (Adjust as Needed)
INSERT INTO effectiveness_chart (attacker, defender, multiplier) VALUES
('Dragon', 'Dragon', 1.0),
('Dragon', 'Undead', 2.0),
('Dragon', 'Golem', 2.0),
('Dragon', 'Phantom', 1.0),
('Dragon', 'Beast', 0.5),
('Dragon', 'Mythical', 1.0),
('Undead', 'Dragon', 0.5),
('Undead', 'Undead', 1.0),
('Undead', 'Golem', 2.0),
('Undead', 'Phantom', 2.0),
('Undead', 'Beast', 1.0),
('Undead', 'Mythical', 1.0),
('Golem', 'Dragon', 1.0),
('Golem', 'Undead', 0.5),
('Golem', 'Golem', 1.0),
('Golem', 'Phantom', 2.0),
('Golem', 'Beast', 2.0),
('Golem', 'Mythical', 1.0),
('Phantom', 'Dragon', 1.0),
('Phantom', 'Undead', 2.0),
('Phantom', 'Golem', 0.5),
('Phantom', 'Phantom', 1.0),
('Phantom', 'Beast', 2.0),
('Phantom', 'Mythical', 1.0),
('Beast', 'Dragon', 2.0),
('Beast', 'Undead', 1.0),
('Beast', 'Golem', 1.0),
('Beast', 'Phantom', 0.5),
('Beast', 'Beast', 1.0),
('Beast', 'Mythical', 1.0),
('Mythical', 'Dragon', 1.25),
('Mythical', 'Undead', 1.25),
('Mythical', 'Golem', 1.25),
('Mythical', 'Phantom', 1.25),
('Mythical', 'Beast', 1.25),
('Mythical', 'Mythical', 1.25);

-- Insert Monster Cards
INSERT INTO cards (name, monster_name, type, part, speed, attack, defense, health, rarity) VALUES
-- Dragon Head
('Dragon Head (Common)', 'Wyvern', 1, 'Head', 12, 15, 13, 12, 'Common'),
('Dragon Head (Rare)', 'Drake', 1, 'Head', 14, 18, 16, 14, 'Rare'),
('Dragon Head (Epic)', 'Elder Dragon', 1, 'Head', 29, 27, 26, 26, 'Epic'),
('Dragon Head (Legendary)', 'Dragon God', 1, 'Head', 30, 33, 35, 30, 'Legendary'),
('Dragon Head (Mythical)', 'Bahamut', 6, 'Head', 48, 42, 43, 49, 'Mythical'),

-- Dragon Body
('Dragon Body (Common)', 'Wyvern', 1, 'Body', 12, 15, 13, 12, 'Common'),
('Dragon Body (Rare)', 'Drake', 1, 'Body', 14, 18, 16, 14, 'Rare'),
('Dragon Body (Epic)', 'Elder Dragon', 1, 'Body', 29, 27, 26, 26, 'Epic'),
('Dragon Body (Legendary)', 'Dragon God', 1, 'Body', 30, 33, 35, 30, 'Legendary'),
('Dragon Body (Mythical)', 'Bahamut', 6, 'Body', 48, 42, 43, 49, 'Mythical'),

-- Dragon Legs
('Dragon Legs (Common)', 'Wyvern', 1, 'Legs', 12, 15, 13, 12, 'Common'),
('Dragon Legs (Rare)', 'Drake', 1, 'Legs', 14, 18, 16, 14, 'Rare'),
('Dragon Legs (Epic)', 'Elder Dragon', 1, 'Legs', 29, 27, 26, 26, 'Epic'),
('Dragon Legs (Legendary)', 'Dragon God', 1, 'Legs', 30, 33, 35, 30, 'Legendary'),
('Dragon Legs (Mythical)', 'Bahamut', 6, 'Legs', 48, 42, 43, 49, 'Mythical'),

-- Undead Head
('Undead Head (Common)', 'Skeleton', 2, 'Head', 10, 10, 10, 20, 'Common'),
('Undead Head (Rare)', 'Vampire', 2, 'Head', 11, 13, 18, 14, 'Rare'),
('Undead Head (Epic)', 'Lich', 2, 'Head', 24, 19, 22, 25, 'Epic'),
('Undead Head (Legendary)', 'Grave Monarch', 2, 'Head', 30, 27, 29, 32, 'Legendary'),
('Undead Head (Mythical)', 'The Grim Reaper', 6, 'Head', 46, 38, 40, 44, 'Mythical'),

-- Undead Body
('Undead Body (Common)', 'Skeleton', 2, 'Body', 10, 10, 10, 20, 'Common'),
('Undead Body (Rare)', 'Vampire', 2, 'Body', 11, 13, 18, 14, 'Rare'),
('Undead Body (Epic)', 'Lich', 2, 'Body', 24, 19, 22, 25, 'Epic'),
('Undead Body (Legendary)', 'Grave Monarch', 2, 'Body', 30, 27, 29, 32, 'Legendary'),
('Undead Body (Mythical)', 'The Grim Reaper', 6, 'Body', 46, 38, 40, 44, 'Mythical'),

-- Undead Legs
('Undead Legs (Common)', 'Skeleton', 2, 'Legs', 10, 10, 10, 20, 'Common'),
('Undead Legs (Rare)', 'Vampire', 2, 'Legs', 11, 13, 18, 14, 'Rare'),
('Undead Legs (Epic)', 'Lich', 2, 'Legs', 24, 19, 22, 25, 'Epic'),
('Undead Legs (Legendary)', 'Grave Monarch', 2, 'Legs', 30, 27, 29, 32, 'Legendary'),
('Undead Legs (Mythical)', 'The Grim Reaper', 6, 'Legs', 46, 38, 40, 44, 'Mythical'),

-- Beast Head
('Beast Head (Common)', 'Direwolf', 5, 'Head', 15, 15, 10, 10, 'Common'),
('Beast Head (Rare)', 'Werewolf', 5, 'Head', 17, 13, 10, 20, 'Rare'),
('Beast Head (Epic)', 'Griffon', 5, 'Head', 23, 24, 27, 28, 'Epic'),
('Beast Head (Legendary)', 'Giant', 5, 'Head', 35, 33, 37, 31, 'Legendary'),
('Beast Head (Mythical)', 'Cerberus', 6, 'Head', 44, 40, 47, 42, 'Mythical'),

-- Beast Body
('Beast Body (Common)', 'Direwolf', 5, 'Body', 15, 15, 10, 10, 'Common'),
('Beast Body (Rare)', 'Werewolf', 5, 'Body', 17, 13, 10, 20, 'Rare'),
('Beast Body (Epic)', 'Griffon', 5, 'Body', 23, 24, 27, 28, 'Epic'),
('Beast Body (Legendary)', 'Giant', 5, 'Body', 35, 33, 37, 31, 'Legendary'),
('Beast Body (Mythical)', 'Cerberus', 6, 'Body', 44, 40, 47, 42, 'Mythical'),

-- Beast Legs
('Beast Legs (Common)', 'Direwolf', 5, 'Legs', 15, 15, 10, 10, 'Common'),
('Beast Legs (Rare)', 'Werewolf', 5, 'Legs', 17, 13, 10, 20, 'Rare'),
('Beast Legs (Epic)', 'Griffon', 5, 'Legs', 23, 24, 27, 28, 'Epic'),
('Beast Legs (Legendary)', 'Giant', 5, 'Legs', 35, 33, 37, 31, 'Legendary'),
('Beast Legs (Mythical)', 'Cerberus', 6, 'Legs', 44, 40, 47, 42, 'Mythical'),

-- Golem Head
('Golem Head (Common)', 'Clay Golem', 3, 'Head', 5, 10, 10, 25, 'Common'),
('Golem Head (Rare)', 'Flint Juggernaut', 3, 'Head', 20, 19, 10, 15, 'Rare'),
('Golem Head (Epic)', 'Titanium Giant', 3, 'Head', 27, 23, 21, 21, 'Epic'),
('Golem Head (Legendary)', 'Titan', 3, 'Head', 36, 35, 33, 35, 'Legendary'),
('Golem Head (Mythical)', 'Cthulhu', 6, 'Head', 44, 45, 44, 47, 'Mythical'),

-- Golem Body
('Golem Body (Common)', 'Clay Golem', 3, 'Body', 5, 10, 10, 25, 'Common'),
('Golem Body (Rare)', 'Flint Juggernaut', 3, 'Body', 20, 19, 10, 15, 'Rare'),
('Golem Body (Epic)', 'Titanium Giant', 3, 'Body', 27, 23, 21, 21, 'Epic'),
('Golem Body (Legendary)', 'Titan', 3, 'Body', 36, 35, 33, 35, 'Legendary'),
('Golem Body (Mythical)', 'Cthulhu', 6, 'Body', 44, 45, 44, 47, 'Mythical'),

-- Golem Legs
('Golem Legs (Common)', 'Clay Golem', 3, 'Legs', 5, 10, 10, 25, 'Common'),
('Golem Legs (Rare)', 'Flint Juggernaut', 3, 'Legs', 20, 19, 10, 15, 'Rare'),
('Golem Legs (Epic)', 'Titanium Giant', 3, 'Legs', 27, 23, 21, 21, 'Epic'),
('Golem Legs (Legendary)', 'Titan', 3, 'Legs', 36, 35, 33, 35, 'Legendary'),
('Golem Legs (Mythical)', 'Cthulhu', 6, 'Legs', 44, 45, 44, 47, 'Mythical'),

-- Phantom Head
('Phantom Head (Common)', 'Ghost', 4, 'Head', 15, 10, 10, 15, 'Common'),
('Phantom Head (Rare)', 'Shade', 4, 'Head', 19, 19, 10, 16, 'Rare'),
('Phantom Head (Epic)', 'Nightstalker', 4, 'Head', 26, 28, 30, 29, 'Epic'),
('Phantom Head (Legendary)', 'King of Darkness', 4, 'Head', 37, 33, 32, 31, 'Legendary'),
('Phantom Head (Mythical)', 'Vecna', 6, 'Head', 47, 49, 42, 47, 'Mythical'),

-- Phantom Body
('Phantom Body (Common)', 'Ghost', 4, 'Body', 15, 10, 10, 15, 'Common'),
('Phantom Body (Rare)', 'Shade', 4, 'Body', 19, 19, 10, 16, 'Rare'),
('Phantom Body (Epic)', 'Nightstalker', 4, 'Body', 26, 28, 30, 29, 'Epic'),
('Phantom Body (Legendary)', 'King of Darkness', 4, 'Body', 37, 33, 32, 31, 'Legendary'),
('Phantom Body (Mythical)', 'Vecna', 6, 'Body', 47, 49, 42, 47, 'Mythical'),

-- Phantom Legs
('Phantom Legs (Common)', 'Ghost', 4, 'Legs', 15, 10, 10, 15, 'Common'),
('Phantom Legs (Rare)', 'Shade', 4, 'Legs', 19, 19, 10, 16, 'Rare'),
('Phantom Legs (Epic)', 'Nightstalker', 4, 'Legs', 26, 28, 30, 29, 'Epic'),
('Phantom Legs (Legendary)', 'King of Darkness', 4, 'Legs', 37, 33, 32, 31, 'Legendary'),
('Phantom Legs (Mythical)', 'Vecna', 6, 'Legs', 47, 49, 42, 47, 'Mythical');