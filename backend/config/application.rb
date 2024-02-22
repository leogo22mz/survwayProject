require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 7.1

    # Si no estás utilizando alguna parte de Rails, puedes excluirlo aquí
    # Por ejemplo, si no usas ActionCable, ActionMailbox, o ActionText:
    # config.api_only = true
    # config.load_defaults 7.1
    # config.autoload_lib(ignore: %w(assets tasks))
    # config.action_cable.mount_path = nil
    # config.action_mailbox.ingress = :exim
    # config.action_text.content_processor = :rich_text

    config.api_only = false
  end
end
