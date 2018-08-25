package zti.expenses.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import javax.inject.Provider;

public class UserUtilsImpl implements UserUtils {

    private final Provider<ApplicationUserRepository> applicationUserRepository;

    @Autowired
    UserUtilsImpl(Provider<ApplicationUserRepository> applicationUserRepository){
        this.applicationUserRepository = applicationUserRepository;
    }

    public ApplicationUser findByAuth(Authentication auth) throws UsernameNotFoundException {
        String username = (String) auth.getPrincipal();
        ApplicationUser user = applicationUserRepository.get().findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException(username);
        }
        return user;
    }
}
