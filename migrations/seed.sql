-- GlowIDE demo seed — clearly labelled demo data only. No real users, money or credentials.
INSERT OR IGNORE INTO supported_networks (id,name,chain_id,rpc_url,explorer_url,symbol,is_primary,status) VALUES
 ('arc','Arc',5042002,'https://rpc.testnet.arc.network','https://testnet.arcscan.app','USDC',1,'testnet'),
 ('base','Base',84532,'https://sepolia.base.org','https://sepolia.basescan.org','ETH',0,'testnet-ready'),
 ('ethereum','Ethereum',11155111,'https://rpc.sepolia.org','https://sepolia.etherscan.io','ETH',0,'testnet-ready'),
 ('solana','Solana',NULL,'https://api.devnet.solana.com','https://explorer.solana.com/?cluster=devnet','SOL',0,'testnet-ready');
INSERT OR IGNORE INTO supported_assets (id,symbol,name,network_id,decimals) VALUES
 ('asset_usdc_arc','USDC','USD Coin','arc',6),
 ('asset_eth_base','ETH','Ether','base',18),
 ('asset_eth_eth','ETH','Ether','ethereum',18),
 ('asset_sol_sol','SOL','Solana','solana',9),
 ('asset_glow_arc','GLOW','GlowIDE Token (testnet)','arc',18);
INSERT OR IGNORE INTO roles (id,name,description) VALUES
 ('role_super_admin','Super administrator','Full platform access, including secrets'),
 ('role_admin','Administrator','Admin portal access'),
 ('role_support','Support agent','Support cases and user lookup'),
 ('role_finance','Finance operator','Transactions, refunds, reconciliation'),
 ('role_compliance','Compliance reviewer','Verification and audit review');
INSERT OR IGNORE INTO ai_models (id,model_id,display_name,provider,enabled,is_default,is_fallback) VALUES
 ('ai_llama','meta-llama/llama-3.3-70b-instruct:free','Llama 3.3 70B Instruct (free)','OpenRouter',1,1,0),
 ('ai_gemma','google/gemma-2-9b-it:free','Gemma 2 9B IT (free)','OpenRouter',1,0,1),
 ('ai_qwen','qwen/qwen-2.5-7b-instruct:free','Qwen 2.5 7B Instruct (free)','OpenRouter',0,0,0);
INSERT OR IGNORE INTO external_integrations (id,provider,endpoint_url,enabled,status) VALUES
 ('int_openrouter','OpenRouter','https://openrouter.ai/api/v1',0,'not_configured'),
 ('int_arc_rpc','Arc RPC provider','https://rpc.testnet.arc.network',0,'not_configured'),
 ('int_circle','Circle (USDC / CCTP)','https://api.circle.com',0,'not_configured');
INSERT OR IGNORE INTO system_settings (key,value_json) VALUES
 ('branding','{"name":"GlowIDE","primary":"#7C3AED"}'),
 ('registration','{"open":true}'),
 ('maintenance','{"enabled":false}');
-- NOTE: encrypted_credentials is intentionally NOT seeded with any real key.
