import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('[v0] Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('[v0] Setting up database...');

    // Create user_preferences table
    const { error: tableError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_preferences (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
          theme_name VARCHAR(50) NOT NULL DEFAULT 'ocean',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Users can view their own preferences"
          ON user_preferences
          FOR SELECT
          USING (auth.uid() = user_id);

        CREATE POLICY "Users can update their own preferences"
          ON user_preferences
          FOR UPDATE
          USING (auth.uid() = user_id);

        CREATE POLICY "Users can insert their own preferences"
          ON user_preferences
          FOR INSERT
          WITH CHECK (auth.uid() = user_id);

        CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER update_user_preferences_updated_at
        BEFORE UPDATE ON user_preferences
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
      `
    });

    if (tableError) {
      console.error('[v0] Table creation error:', tableError);
    } else {
      console.log('[v0] Database setup completed successfully!');
    }
  } catch (error) {
    console.error('[v0] Setup error:', error);
    process.exit(1);
  }
}

setupDatabase();
